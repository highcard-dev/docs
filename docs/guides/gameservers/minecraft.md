---
sidebar_position: 7
---

# Adding Mods to a Minecraft Forge Server
---

To add mods to a Minecraft Forge server, refer to the following steps for downloading and configuring mods.

For SFTP connection and file transfer, use our separate [SFTP guide](/guides/sftp#using-sftp).

Afterward, you should see the following view:
![deploy Folder](/img/minecraft/deployfolder.png)

## Downloading Mods
---

**Mod Sources:**  
You can find mods suitable for Minecraft Forge on websites like:
- [CurseForge](https://www.curseforge.com/minecraft)
- [9Minecraft](https://www.9minecraft.net/)
- [TLMODS](https://tlmods.org/en/)

Example.
![Curseforge](/img/minecraft/curseforge.png)
 
- **Compatibility:** Make sure the mods are compatible with the version of Minecraft Forge and the game itself you're using.

Choose mods only from trusted sites to ensure the security of your server!

## Uploading Mods to the Server
---

After downloading the required mods, use the steps described in the SFTP guide to upload these files to the `mods` folder of your Minecraft Forge server.

![Upload Mod](/img/minecraft/uploadmod.png)

## Restarting the Server and Checking Mods
---

- **Restart the Server:** To activate the added mods, a restart of your server is required.

- **Verification:** After the restart, you can check if the mods have been loaded correctly by either checking the server log or accessing the mod list directly in the game.

## Configuring Mods (Optional)
---

Some mods offer the option to adjust settings via configuration files. These are usually located in the `config` folder of your server. You can edit and adjust these files similarly to the mod files themselves via SFTP.

Do not forget to create a backup of your server before starting the mod installation to avoid possible data loss.
