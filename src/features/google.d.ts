declare namespace google {
    namespace accounts {
        namespace id {
            function initialize(options: { client_id: string; callback: (response: any) => void }): void;
            function renderButton(container: HTMLElement | null, options: { theme: string; size: string }): void;
            function revoke(container: HTMLElement | null, options: any): void;
        }
    }
}
