function close(modalId: string) {
    console.log(`Closing ${modalId}`);
    const modal = document.getElementById(modalId);
    console.log(modal);
    if (modal) (modal as HTMLDialogElement).close();
}

function open(modalId: string) {
    const modal = document.getElementById(modalId);
    if (modal) (modal as HTMLDialogElement).close();
}

export function useModal() {
    return { open, close };
}
