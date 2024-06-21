class Stars:
    def __init__(self, value):
        if not isinstance(value, int) or value < 0:
            raise ValueError("Stars must be a positive integer")
        self.value = value

    def __str__(self):
        return str(self.value)
