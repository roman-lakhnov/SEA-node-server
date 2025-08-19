const http = require('http')
const os = require('os')

const host = '0.0.0.0'
const port = 3000

const startTime = Date.now()

function formatUptime(ms) {
	const totalSec = Math.floor(ms / 1000)
	const hours = Math.floor(totalSec / 3600)
	const minutes = Math.floor((totalSec % 3600) / 60)
	const seconds = totalSec % 60
	return `${hours}h ${minutes}m ${seconds}s`
}

function getLocalIPs() {
	const interfaces = os.networkInterfaces()
	const ips = []
	for (const name of Object.keys(interfaces)) {
		for (const iface of interfaces[name]) {
			if (iface.family === 'IPv4' && !iface.internal) {
				ips.push(iface.address)
			}
		}
	}
	return ips
}

const server = http.createServer((req, res) => {
	if (req.method === 'GET') {
		const uptime = formatUptime(Date.now() - startTime)
		const ips = getLocalIPs()
		res.writeHead(200, { 'Content-Type': 'text/plain' })
		res.end(
			`Server addresses: ${ips
				.map(ip => `http://${ip}:${port}`)
				.join(', ')}\nUptime: ${uptime}\n`
		)
	} else {
		res.writeHead(405, { 'Content-Type': 'text/plain' })
		res.end('Method Not Allowed\n')
	}
})

server.listen(port, host, () => {
	const ips = getLocalIPs()
	console.log(`Server is running on:`)
	ips.forEach(ip => {
		console.log(`  http://${ip}:${port}`)
	})
	console.log(`(Use these addresses from another device in the same network)`)
})

// Every second, print addresses and uptime to the console
setInterval(() => {
	const uptime = formatUptime(Date.now() - startTime)
	const ips = getLocalIPs()
	console.log(
		`Addresses: ${ips
			.map(ip => `http://${ip}:${port}`)
			.join(', ')} | Uptime: ${uptime}`
	)
}, 1000)
