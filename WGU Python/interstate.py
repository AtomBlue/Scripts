highway_number = int(input())
direction = None


if 1 <= highway_number <= 99:
    function = "primary"
    primary_number = highway_number
elif 100 <= highway_number <= 999:
    primary_number = highway_number % 100
    if 1 <= primary_number <= 99:
        function = "auxiliary"
    else:
        print(f"{highway_number} is not a valid interstate highway number.")
        exit()
else:
    print(f"{highway_number} is not a valid interstate highway number.")
    exit()

if primary_number % 2 == 0:
    direction = "east/west"
else:
    direction = "north/south"


if function == "primary":
    print(f"I-{highway_number} is {function}, going {direction}.")
else:
    print(f"I-{highway_number} is {function}, serving I-{primary_number}, going {direction}.")
