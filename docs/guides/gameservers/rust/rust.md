---

sidebar_position: 8

---

# Adding Mods to Rust Oxide Mod Server
---

To add mods to a Rust Oxide Mod server, follow these steps for downloading and setting up mods.

For SFTP connection and file transfer, check out our separate [SFTP guide](/guides/sftp#using-sftp).

Then you should see something like this:
![deploy Folder](/img/minecraft/deployfolder.png)

## Downloading Mods
---

**Where to Find Mods:**  
You can find mods suitable for Rust Oxide Mod on websites like:
- [uMod](https://umod.org/plugins?page=1&sort=title&sortdir=asc&categories=rust)
- [Codefling](https://codefling.com/mods)

Example:
![uMod](/img/rust/umod.png)
 
- **Compatibility:** Make sure the mods are compatible with the version of Rust Oxide Mods you're using and the game itself.


Only pick mods from trusted websites to keep your server safe!

## Uploading Mods to the Server
---

After downloading the mods you need, follow the steps described in the SFTP guide to upload these files to the `/oxide/plugins/` folder of your Rust server.

![Upload Mod](/img/rust/mod_folder.png)

## Reloading Server Resources
---

- **Reloading Server Resources:** To activate the added mods, you can type  
`oxide.reload *` in the console.

- **Checking:** After reloading, you can check if the mods were loaded correctly by either checking the server log or accessing the mod list directly in the game.

## Configuring Mods (optional)
---

Some mods allow you to adjust settings via configuration files. These are usually located in the `/oxide/config/` folder of your server. You can edit and customize these files just like the mod files themselves using SFTP.

Don't forget to back up your server before starting the mod installation to avoid potential data loss.
