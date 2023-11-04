---
title: Code blocks within Markdown tables
date: 2021-04-09T17:10:00+03:00 
tags:
  - Pitfall
  - Python
---

Markdown provides support for tables, but only basic text formatting (such as bold, italics, inline code, etc.) is supported within table cells. More complex text formatting, such as code blocks and horizontal lines, is not supported. If you need to add support for complex formatting within tables and you are using Github Flavored Markdown, one approach is to use HTML to define the table structure and then include inline Markdown text within it. Here is an example:

Please note the following:
- The `<td>` and `</td>` tags for the corresponding table cells should be placed at the beginning of a new line (without any indentation).
- There should be a blank line between the Markdown text inside the table cell and the `<td>` and `</td>` tags.

Example:

<table>
<tr>
<td> Column 1 </td> <td> Column 2 </td>
</tr>
<tr>
<td> Code Block </td>
<td>

```python
print("hello world")
```

</td>
</tr>
<tr>
<td> Horizontal Line </td>
<td>

**Markdown** 

---

Some Text

</td>
</tr>
</table>

Code: **Note that the code block should end with 3 tildes** (I'm using two here because three would cause rendering errors and prematurely end the code block).

```html
<table>
<tr>
<td> Column 1 </td> <td> Column 2 </td>
</tr>
<tr>
<td> Code Block </td>
<td>                           <!--line start-->
                               <!--empty line-->
```python
print("hello world")
``                             <!--Should be 3 tilt here!-->
                               <!--empty line-->
</td>                          <!--line start-->
</tr>
<tr>
<td> Horizontal Line </td>
<td>

**Markdown** 

---

Some Text

</td>
</tr>
</table>
```

Reference link:
- https://stackoverflow.com/a/60502719