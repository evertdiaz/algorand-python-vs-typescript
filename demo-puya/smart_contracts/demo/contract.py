from puyapy import ARC4Contract, UInt64, arc4


class Demo(ARC4Contract):
    @arc4.abimethod()
    def sum(self, a: UInt64, b: UInt64) -> UInt64:
        return a + b

    @arc4.abimethod()
    def difference(self, a: UInt64, b: UInt64) -> UInt64:
        if a < b:
            return b - a
        else:
            return a - b
