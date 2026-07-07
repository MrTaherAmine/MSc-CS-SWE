"""
Contact Search System Using Data Structures

Features:
1. Add contacts with names and phone numbers.
2. Store contacts in a doubly linked list.
3. Store contacts in a hash table using Python dict for fast exact-name lookup.
4. Search contacts by substring using a naive string matching algorithm.
5. Display contacts forward and backward.

Author: Taher Amine ELHOUARI
"""


class Contact:
    """Represents a contact with a name and phone number."""

    def __init__(self, name, phone):
        self.name = name
        self.phone = phone

    def __str__(self):
        return f"{self.name} - {self.phone}"


class Node:
    """Represents one node in a doubly linked list."""

    def __init__(self, contact):
        self.contact = contact
        self.prev = None
        self.next = None


class DoublyLinkedList:
    """Doubly linked list used to store contacts."""

    def __init__(self):
        self.head = None
        self.tail = None

    def add_contact(self, contact):
        """Adds a contact at the end of the doubly linked list."""
        new_node = Node(contact)

        if self.head is None:
            self.head = new_node
            self.tail = new_node
        else:
            self.tail.next = new_node
            new_node.prev = self.tail
            self.tail = new_node

    def display_forward(self):
        """Displays all contacts from head to tail."""
        if self.head is None:
            print("No contacts found.")
            return

        current = self.head
        print("\nContacts Forward:")
        while current is not None:
            print(current.contact)
            current = current.next

    def display_backward(self):
        """Displays all contacts from tail to head."""
        if self.tail is None:
            print("No contacts found.")
            return

        current = self.tail
        print("\nContacts Backward:")
        while current is not None:
            print(current.contact)
            current = current.prev

    def get_all_contacts(self):
        """Returns all contacts as a list."""
        contacts = []
        current = self.head

        while current is not None:
            contacts.append(current.contact)
            current = current.next

        return contacts


def naive_substring_search(text, pattern):
    """
    Naive string matching algorithm.
    Returns True if pattern exists inside text, otherwise False.
    """

    text = text.lower()
    pattern = pattern.lower()

    n = len(text)
    m = len(pattern)

    if m == 0:
        return True

    if m > n:
        return False

    for i in range(n - m + 1):
        match = True

        for j in range(m):
            if text[i + j] != pattern[j]:
                match = False
                break

        if match:
            return True

    return False


class ContactManagementSystem:
    """Main contact management system."""

    def __init__(self):
        self.contacts_list = DoublyLinkedList()
        self.contacts_table = {}

    def add_contact(self):
        """Adds a new contact to both the doubly linked list and hash table."""
        name = input("Name: ").strip()
        phone = input("Phone: ").strip()

        if name == "" or phone == "":
            print("Name and phone cannot be empty.")
            return

        # Store names in lowercase as keys to make exact search case-insensitive
        key = name.lower()

        if key in self.contacts_table:
            print("A contact with this name already exists.")
            return

        contact = Contact(name, phone)

        self.contacts_list.add_contact(contact)
        self.contacts_table[key] = contact

        print("Contact added.")

    def search_by_keyword(self):
        """Searches contacts using a substring keyword."""
        keyword = input("Search keyword: ").strip()

        if keyword == "":
            print("Keyword cannot be empty.")
            return

        contacts = self.contacts_list.get_all_contacts()
        found = False

        for contact in contacts:
            if naive_substring_search(contact.name, keyword):
                print(f"Match found: {contact}")
                found = True

        if not found:
            print("No matching contacts found.")

    def search_by_exact_name(self):
        """Searches for a contact by exact name using the hash table."""
        name = input("Exact name: ").strip()
        key = name.lower()

        contact = self.contacts_table.get(key)

        if contact:
            print(f"Contact found: {contact}")
        else:
            print("Contact not found.")

    def display_forward(self):
        """Displays all contacts in forward order."""
        self.contacts_list.display_forward()

    def display_backward(self):
        """Displays all contacts in backward order."""
        self.contacts_list.display_backward()

    def run(self):
        """Runs the text menu."""
        while True:
            print("\n==============================")
            print("Contact Search System")
            print("==============================")
            print("1. Add Contact")
            print("2. Search by Keyword")
            print("3. Search by Exact Name")
            print("4. View All (Forward)")
            print("5. View All (Backward)")
            print("6. Exit")

            option = input("\nEnter option: ").strip()

            if option == "1":
                self.add_contact()
            elif option == "2":
                self.search_by_keyword()
            elif option == "3":
                self.search_by_exact_name()
            elif option == "4":
                self.display_forward()
            elif option == "5":
                self.display_backward()
            elif option == "6":
                print("Goodbye!")
                break
            else:
                print("Invalid option. Please choose between 1 and 6.")


if __name__ == "__main__":
    system = ContactManagementSystem()
    system.run()
