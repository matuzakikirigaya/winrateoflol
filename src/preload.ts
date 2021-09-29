import { contextBridge, ipcRenderer } from "electron";

function makeDialog(message: string): () => Promise<void | string[]> {
  const dialog = async (): Promise<void | string[]> =>
    await ipcRenderer.invoke(message);
  return dialog;
}

const openDialog = contextBridge.exposeInMainWorld("myAPI", {
  twisted: makeDialog("twisted"),
});
