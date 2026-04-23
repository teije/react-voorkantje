function SignUpForm() {
    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault(); // Voorkomt dat de pagina herlaadt bij het submitten van het formulier
        const formData = new FormData(event.currentTarget);
    }
}