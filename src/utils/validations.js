// Utility function to validate email format
export const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  
  // Utility function to check if a field is empty
  export const validateRequiredField = (value) => {
    return value.trim() !== "";
  };
  
  // Utility function to validate Cloudinary or external image URLs
  export const validateImageUrl = (url) => {
    const imageRegex = /\.(jpeg|jpg|png|gif|bmp|webp)$/i;
    return imageRegex.test(url);
  };
  
  // Utility function to validate the entire form
  export const validateForm = (formData) => {
    const errors = {};
  
    if (!validateRequiredField(formData.fullName)) {
      errors.fullName = "Full Name is required";
    }
  
    if (!validateRequiredField(formData.email)) {
      errors.email = "Email is required";
    } else if (!validateEmail(formData.email)) {
      errors.email = "Invalid email format";
    }
  
    if (!validateRequiredField(formData.avatar)) {
      errors.avatar = "Avatar URL is required";
    } else if (!validateImageUrl(formData.avatar)) {
      errors.avatar = "Invalid image URL";
    }
  
    return errors;
  };