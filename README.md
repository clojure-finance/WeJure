# WeJure: A Decentralized Social Network

## Features
- Runs on a peer-to-peer network
- Secured and immutable data
- Transparency of data usage and source code
- **Group chat functionality**:
    - Invite users to your group.
    - Group creators can remove members.
    - Layered encryption ensures message history privacy:
        - New members cannot access messages sent before they joined.
        - Removed members can only access messages from the period they were part of the group. Users can only access group messages pertinent to their duration of membership.

## Getting started
WeJure is developed using [shadow-cljs](https://github.com/thheller/shadow-cljs) (which requires Node.js, Yarn, and a Java SDK).
The following software are needed:
- [Node.js](https://nodejs.org/en)
- [Yarn](https://yarnpkg.com/)
- [Java SDK (Adoptium)](https://adoptium.net/)
- [InterPlanetary File System (IPFS)](https://ipfs.tech/)

## Security and Encryption
WeJure prioritizes the privacy and security of your communications. While GunDB stores data locally, the content of messages itself is not encrypted by GunDB by default. To address this, WeJure leverages the **SEA (Security, Encryption, Authorization) library**, which is GunDB's built-in cryptography layer, for robust end-to-end encryption of all messages.

### Encryption Mechanisms in SEA
SEA employs a combination of strong cryptographic methods:
-   **AES-GCM**: Used for symmetric encryption of message content.
-   **ECDH (Elliptic Curve Diffie-Hellman)**: Used for asymmetric key agreement, allowing users to securely establish shared secret keys.

### Key Generation and Management

**1. Direct Messages:**
For one-on-one conversations, a shared secret key is generated between the two participants. This is typically achieved using a function like `SEA.secret(recipientEpub, senderKeyPair)`, where `recipientEpub` is the recipient's public key and `senderKeyPair` is the sender's public/private key pair. This ensures that only the sender and the recipient can decrypt the messages exchanged. An encrypted message would then be generated using a command similar to `let encryptedMessage = await SEA.encrypt(message, sharedKey);`.

**2. Group Chats:**
Group chat security introduces more complexity. In WeJure:
-   A unique group key is initialized for each group. This key generation incorporates multiple random variables to enhance security.
-   **Layered Encryption for Message History**: WeJure implements a layered encryption approach for group chats. This design has specific implications for message visibility when group membership changes:
    -   When a new user is invited to a group, they will not be able to decrypt or access messages that were exchanged *before* they joined, even if they somehow acquire the group's historical encrypted data.
    -   If a user is removed from a group, they will only be able to access the message history from the period they were an active member. They will not be able to access messages sent after their removal, nor can they decrypt new messages.
    -   Essentially, users can only access group messages pertinent to their own duration of membership within the group. This is designed to protect the ongoing privacy and integrity of the group conversation even as its composition evolves.

<!-- Before running WeJure, run `yarn` to download all the dependencies. -->

<!-- To run or configure WeJure on your local environment, first navigate to `src/wejure/js` in terminal and run `node relay` to start a relay server for synchronizing data in gunDB. Next, run a local IPFS client to host IPFS. In the root directory, start a local server by the command `yarn dev`. Then visit [localhost:8020]. -->

## Special notes
- To delete all the gunDB data, clear the browser local storage in every browser that you used opened WeJure with. Then, delete the `radata` folder in `src/wejure/js`.

## User guide
Users will need to create an account or sign in from the top right corner of the main page. After logging in, users will be able to send messages to other users online. WeJure also supports **group chats** with features for inviting and managing members, and specific privacy controls for message history (as detailed in the Features and Security and Encryption sections).

## Configuration
### IPFS
- The port for IPFS should be 5001. If not, you can correct the settings by running `ipfs config Addresses.API /ip4/127.0.0.1/tcp/5001` in terminal.

## First-Time Setup
**Mac OS**
```bash
chmod +x WejureStartup.sh  # Make script executable
./WejureStartup.sh        # Install dependencies and setup
```

**Windows**
```powershell
Set-ExecutionPolicy RemoteSigned -Scope Process  # Allow script execution
.\WeJureWinStart.ps1                             # Run in PowerShell
```

## Running the Application

**Mac OS**
```bash
chmod +x WejureRun.sh  # Make script executable
./WejureRun.sh
```
**Windows**
```powershell
.\WeJureWinRun.ps1                           # Run in PowerShell
```

After running, access the application at: http://localhost:8020

## Relay Server Deployment
You can support the stability of WeJure by deploying your own relay server!
The GunDB relay server implementation can be found in the gun-relay branch.

## Development in process
The current project is still under development. 

**Delete all data**
```bash
chmod +x remove_local_gun.sh  # Make script executable
./remove_local_gun.sh
```
This command line remove the data in the local gunDB storage for the convenience of development. You need to delete the data storage in the browser before execute this script to ensure correct removing.

**UI for creating groups and for blacklist is under construction.**
**Bugs exist for auto refreshing in chatpage**