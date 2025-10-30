"use server"

export async function handleFormData(formData){
    const name = formData.get("name");
    const message = formData.get("message");

    console.log("form submitted: ", {name, message})

    return {success: true, message: `Submitted`, name, message}
}
