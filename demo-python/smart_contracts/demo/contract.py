from puyapy import ARC4Contract, Bytes, LocalState, Txn, arc4, itxn


class Demo(ARC4Contract):
    def __init__(self) -> None:
        self.company_name = Bytes()
        # self.company_name = GlobalState(Bytes())

        self.employee_name = LocalState(Bytes)

    @arc4.abimethod()
    def register(self, name: arc4.String) -> None:
        self.company_name = name.decode()

    @arc4.abimethod()
    def get_name(self) -> arc4.String:
        return arc4.String.encode(self.company_name)

    @arc4.abimethod()
    def create_asa(self) -> arc4.UInt64:
        self.created_asset_id = (
            itxn.AssetConfig(
                total=1,
                decimals=0,
                default_frozen=False,
                asset_name=self.company_name,
                unit_name=b"TKN",
                fee=0,
            )
            .submit()
            .created_asset.asset_id
        )
        return arc4.UInt64(self.created_asset_id)

    @arc4.abimethod(allow_actions=["OptIn"])
    def opt_in(self) -> None:
        pass

    @arc4.abimethod
    def register_employee(self, name: arc4.String) -> None:
        self.employee_name[Txn.sender] = name.decode()

    @arc4.abimethod
    def get_employee_name(self) -> arc4.String:
        return arc4.String.encode(self.employee_name[Txn.sender])
