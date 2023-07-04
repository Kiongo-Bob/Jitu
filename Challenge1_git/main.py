name = str(input("Enter your name: "))
print(f"{name}, don't quit. You've got this!")

name = str(input("For branch name type [Yes] esle [No] ").lower())
if name == 'yes':
    print(f"You're working in the python branch.")
else:
    print("Ok.")