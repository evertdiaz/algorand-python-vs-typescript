from puyapy import ARC4Contract, Bytes, arc4


class Demo(ARC4Contract):
    def __init__(self) -> None:
        self.company_name = Bytes()
        # self.company_name = GlobalState(Bytes())

    @arc4.abimethod()
    def register(self, name: arc4.String) -> None:
        self.company_name = name.decode()

    @arc4.abimethod()
    def get_name(self) -> arc4.String:
        return arc4.String.encode(self.company_name)
