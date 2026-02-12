# Instructions

The following ticket describes the task of adding search functionality to our Todo application. 

Please implement the features as outlined in the ticket description, ensuring that the search is efficient and provides a good user experience.

**Note:** This is a coding challenge, so you may encounter areas where the code could be improved. While implementing the new search feature, feel free to make any improvements to the existing code structure that you think would benefit the overall architecture, maintainability, or performance.

---

# Add Search Functionality to Todo Application

## Description

Our users have been asking for a way to quickly find specific todos in their list, especially when they have many items. Currently, users have to scroll through the entire list to find what they're looking for, which isn't a great experience.

We need to add a search feature that will help users find their todos faster.

## User Story

**As a** user with multiple todos  
**I want to** be able to search through my todo list  
**So that** I can quickly find specific items without scrolling through everything

## Acceptance Criteria

- [ ] Users can type in a search box to look for todos
- [ ] The todo list should update to show only matching items
- [ ] Search should work while the user is typing (no need to hit enter)
- [ ] If no todos match the search, show an appropriate message
- [ ] Users should be able to clear the search to see all todos again