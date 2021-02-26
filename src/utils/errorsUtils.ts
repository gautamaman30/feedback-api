
export const Errors = {
    ADMIN_KEY_REQUIRED : "Admin key is required",
    ADMIN_POST_FEEDBACK : "Admin cannot give feedbacks",
    ADMIN_EDIT_FEEDBACK : "Only users can edit their feedback",
    ADMIN_DELETE_ADMIN : "Admin cannot delete another admin", 
    ADMIN_NOT_FOUND : "Admin not found",
    
  
    USER_NAME_REQUIRED : "User name is required",
    USER_ID_REQUIRED : "User id is required",
    USER_POST_OWN_FEEDBACK : "User cannot post feedbacks about themselves",
    USER_EDIT_OTHERS_FEEDBACK : "User cannot update other user's feedbacks",
    DUPLICATE_USER_NAME : "User with this name already exists",
    USER_NOT_FOUND : "User not found",
  
    TECHNOLOGY_NAME_REQUIRED : "Technology name is required",
    TECHNOLOGY_DETAILS_REQUIRED : "Technology details is required",
    TECHNOLOGY_NOT_FOUND : "Technology not found",
    DUPLICATE_TECHNOLOGY : "Technology with this name already exists",
  
    FEEDBACK_NAME_REQUIRED: "Feedback name is required",
    FEEDBACK_ID_REQUIRED : "Feedback id is required",
    FEEDBACK_REQUIRED: "Feedback is required",
    FEEDBACK_STATUS_REQUIRED : "Feedback status is required", 
    FEEDBACK_STATUS_INCORRECT : "Feedback status can be 'approved' or 'rejected' only",
    FEEDBACK_EMPTY: "Feedback cannot be empty",
    FEEDBACK_NOT_FOUND : "Feedback not found",
    FEEDBACK_USER_COUNT_EXIST : "Count with this name already exists",
      
    NAME_NOT_FOUND: "Name not found",
    DATE_FORMAT_INCORRECT: "Only accepted date format is 'YYYY-MM-DD'",
    INTERNAL_ERROR : "Internal error",
    BAD_REQUEST : "Bad request",
    AUTHORIZATION_FAILED : "Authorization failed" 
  }