// Write your code below:
// Function to handle form submission
function handleFormSubmit(event) {
  event.preventDefault(); // Prevent form from submitting and refreshing the page

  // Retrieve values from input fields
  const expense = document.getElementById('expense').value;
  const description = document.getElementById('description').value;
  const category = document.getElementById('category').value;

  // Check if the input fields are not empty
  if (expense && description && category) {
    // Create a user object
    const userDetails = {
      expense: expense,
      description: description,
      category: category
    };

    // Store user details in local storage using the description as the key
    console.log(userDetails);
    localStorage.setItem(description, JSON.stringify(userDetails));

    // Clear input fields after submission
    document.getElementById('expense').value = '';
    document.getElementById('description').value = '';
    document.getElementById('category').value = '';

    // Display the updated users list
    displayUsers();
  }
}

// Function to display users on the page
function displayUsers() {
  // Get the user list element (ul) from the DOM
  const userList = document.getElementById('user-list');

  // Clear the existing list to avoid duplication
  userList.innerHTML = '';

  // Loop through each key in local storage
  for (let i = 0; i < localStorage.length; i++) {
    const description = localStorage.key(i); // Get the key (description)
    const userDetails = JSON.parse(localStorage.getItem(description)); // Retrieve user details

    // Create a list item for each user
    const listItem = document.createElement('li');
    listItem.textContent = `${userDetails.expense} - ${userDetails.category} - ${userDetails.description}`;

    // Create a delete button
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.style.marginLeft = '10px';
    
    // Add event listener to delete the user when the button is clicked
    deleteButton.addEventListener('click', function() {
      // Remove user from local storage
      localStorage.removeItem(description);
      
      // Remove the list item from the DOM
      listItem.remove();
    });

    // Create an edit button
    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.style.marginLeft = '10px';

    // Add event listener to edit the user when the button is clicked
    editButton.addEventListener('click', function() {
      // Populate the form fields with existing user data
      document.getElementById('expense').value = userDetails.expense;
      document.getElementById('description').value = userDetails.description;
      document.getElementById('category').value = userDetails.category;

      // Remove user from local storage and the list item from the DOM
      localStorage.removeItem(description);
      listItem.remove();
    });

    // Append the delete and edit buttons to the list item
    listItem.appendChild(deleteButton);
    listItem.appendChild(editButton);

    // Append the list item to the ul
    userList.appendChild(listItem);
  }
}

// Initialize the users list display when the page loads
window.onload = displayUsers;

// Export the function for testing purposes
 
 
  module.exports = handleFormSubmit;