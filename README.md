# SEA Node Server

A simple HTTP server that displays its local network addresses and uptime.  
This project demonstrates how to package a Node.js server as a single executable
application using Node.js Self-Extracting Archive (SEA).

---

## Features

- Shows all local IPv4 addresses and server uptime via HTTP and console.
- Can be packaged as a single executable for Linux or Windows using Node.js SEA
  and [postject](https://github.com/indutny/postject).

---

## How to Run the Server (Development)

1. **Install Node.js**  
   Download and install Node.js (v22.x recommended) from
   [nodejs.org](https://nodejs.org/en/download/current).

2. **Install Dependencies**

   ```sh
   npm install
   ```

3. **Start the Server**

   ```sh
   npm start
   ```

   The server will print its accessible addresses and uptime every second.

---

## How to Build a Single Executable (SEA)

### 1. Download Prebuilt Node.js Binary

Download the prebuilt Node.js binary for your target OS and architecture from
[nodejs.org](https://nodejs.org/en/download/current).

**Example tested versions:**

- `node-v22.18.0-linux-x64.tar.xz`
- `node-v22.18.0-win-x64.zip`

Extract and place the `node` (Linux) or `node.exe` (Windows) binary in your
project root.

### 2. Match Node.js Version for Blob Creation

Ensure your development environment uses the same Node.js version as your target
binary.  
Use [nvm](https://github.com/nvm-sh/nvm) to manage Node.js versions:

```sh
nvm install 22.18.0
nvm use 22.18.0
```

### 3. Create the SEA Blob

Run the following command to generate the SEA blob:

```sh
npm run blob
```

This uses the configuration in `sea-config.json` to bundle your app into
`server.blob`.

### 4. Inject the Blob into the Node Binary

Use [postject](https://github.com/indutny/postject) to inject the blob into the
Node.js binary:

```sh
npm run inject
```

- On Windows, run this step in a Windows environment to avoid signature issues.
- Architecture does not need to match for injection, but OS should.

The resulting binary (`node` or `node.exe` with the blob injected) is now a
standalone executable for your server.

---

## Example Scripts

- **Start server:**

  ```sh
  npm start
  ```

- **Create SEA blob:**

  ```sh
  npm run blob
  ```

- **Inject blob into Node binary:**

  ```sh
  npm run inject
  ```

---

## Files

- `server.js` — Main server code.
- `sea-config.json` — SEA configuration.
- `package.json` — Project metadata and scripts.
- `README.md` — This documentation.

---

## Notes

- For more details on SEA, see the
  [official Node.js documentation](https://nodejs.org/api/single-executable-applications.html).
- For cross-platform builds, always use the correct Node.js binary for your
  target OS and architecture.
- If you encounter issues with signatures on Windows, perform the injection step
  on a Windows machine.

---

## License

ISC
