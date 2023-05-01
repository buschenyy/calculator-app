# СalcApp

## Bug List

### Open

- [ ] Issue with adding a decimal point after a calculation resulted in unexpected behavior.
      Example: [524.524 + 25.25 + 7 add **.** -> **0.**] or [0.0 + 5 + 7 add **.** -> **0.**]

- [ ] When inputs **1 + 0.0** and then **5**, the calc performs the operation **1 + 5** instead of **1 + 0.05**.

### Closed

- [x] Issue with adding **5** to **52425.0** resulting in **52425.05**
- [x] Issue with adding digit to **5.20002500** resulting in no output
