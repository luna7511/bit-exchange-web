import type {FC} from "react";

const OrdersList: FC<{
    type: "open" | "filled" | "canceled"
}> = () => {
    return (
        <div className={"p-2"}></div>
    )
}

export default OrdersList