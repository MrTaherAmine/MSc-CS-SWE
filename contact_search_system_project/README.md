# Contact Search System Using Data Structures

## Description

This project is a simple contact management system built in Python.

It allows users to:

- Add contacts with names and phone numbers.
- Search for contacts using a substring keyword.
- Search quickly by exact name using a hash table.
- View all contacts in forward order.
- View all contacts in backward order.

The project combines three important data structure concepts:

1. Doubly Linked List
2. Hash Table
3. String Matching Algorithm

---

## Data Structures Used

### 1. Contact Class

The `Contact` class stores the contact name and phone number.

```python
class Contact:
    def __init__(self, name, phone):
        self.name = name
        self.phone = phone
```

---

### 2. Doubly Linked List

Contacts are stored inside a doubly linked list.

Each node has:

- `prev` pointer
- `next` pointer
- `contact` object

This allows the system to display contacts in both directions:

- Forward
- Backward

---

### 3. Hash Table

Python's dictionary is used as a hash table.

It stores contacts by name for fast exact lookup.

```python
self.contacts_table[key] = contact
```

This gives average-case `O(1)` lookup time.

---

### 4. Naive String Matching

A simple naive substring search algorithm is implemented to find contacts whose names contain a keyword.

Example:

Searching for `Al` can match:

```text
Alice
Ali
Khaled
```

---

## Menu Options

```text
1. Add Contact
2. Search by Keyword
3. Search by Exact Name
4. View All (Forward)
5. View All (Backward)
6. Exit
```

---

## Example Output

```text
1. Add Contact
2. Search by Keyword
3. Search by Exact Name
4. View All (Forward)
5. View All (Backward)
6. Exit

Enter option: 1
Name: Alice
Phone: 1234567890
Contact added.

Enter option: 2
Search keyword: Al
Match found: Alice - 1234567890
```

---

## How to Run

Make sure Python is installed, then run:

```bash
python contact_search_system.py
```

---

## Author

Taher Amine ELHOUARI
