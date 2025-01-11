import { FC, useState } from "react";

import IconMinus from "assets/images/icons8-reduce-96 1.svg";
import IconPlus from "assets/images/icons8-add-new-100 1.svg";
import CheckBoxEmpty from "assets/images/Frame 3548.svg";
import CheckedBox from "assets/images/Check-All.svg";
import beverageIcon from "assets/images/icons8-beverage.png";
import IconCancel from "assets/images/icons8-cancel-96 1.svg";
import { Checkbox, FormControl, FormControlLabel, Radio, RadioGroup } from "@mui/material";
import { formatNumberMoney } from "utils/converter";

export const ItemInCartMenu: FC<any> = ({
    item, service, increaseCount, decreaseCount,
    handleChooseVariant, handleChangeQuantity, handleChangeNote, handleChangeValue, handleRemoveItem
}) =>  {
    const [menuShowList, setMenuState] = useState(false);

    const calTotalPriceEachProduct = (product: any) => {
        let price = 0;
        switch (true) {
            case service === "1" && product.size === "1":
                price = product.unitPrice || 0;
                break;
            case service === "2" && product.size === "1":
                price = product.unitPrice2 || 0;
                break;
            case service === "1" && product.size === "2":
                price = product.unitPrice3 || 0;
                break;
            case service === "2" && product.size === "2":
                price = product.unitPrice4 || 0;
                break;
            default:
                break;
        }

        let amount = price * product.quantity;
        if (product.variantsSelected && product.variantsSelected.length) {
            product.variantsSelected.forEach((variant: any) => {
                let variantPrice = 0;
                switch (true) {
                    case service === "1" && item.size === "1":
                        variantPrice = variant.unitPrice || 0;
                        break;
                    case service === "2" && item.size === "1":
                        variantPrice = variant.unitPrice2 || 0;
                        break;
                    case service === "1" && item.size === "2":
                        variantPrice = variant.unitPrice3 || 0;
                        break;
                    case service === "2" && item.size === "2":
                        variantPrice = variant.unitPrice4 || 0;
                        break;
                    default:
                        break;
                }
                amount += variantPrice * product.quantity;
            });
        }
        return formatNumberMoney(amount);
    }

    const returnVariantPrice = (variant: any) => {
        let price = 0;
        switch (true) {
            case service === "1" && item.size === "1":
                price = variant.unitPrice || 0;
                break;
            case service === "2" && item.size === "1":
                price = variant.unitPrice2 || 0;
                break;
            case service === "1" && item.size === "2":
                price = variant.unitPrice3 || 0;
                break;
            case service === "2" && item.size === "2":
                price = variant.unitPrice4 || 0;
                break;
            default:
                break;
        }
        return formatNumberMoney(price)
    }

    return (
        <div className="">
            <div className="border-b-0.5 mb-2 bg-white">
                <div className="flex gap-2 w-full border-b-0.5 py-2 pl-3 pr-3">
                    <img src={item?.images?.length ? `${process.env.REACT_APP_URL_S3}${item?.images[0]?.path}` : beverageIcon} alt="item" className="w-[44px] h-[44px]" />
                    <div className="w-full">
                        <div className="flex justify-between">
                            <div>
                                <p className="font-bold truncate cursor-pointer" title="Ẩn/hiện thông tin chi tiết" onClick={() => setMenuState(!menuShowList)}>
                                    {item.name}
                                </p>
                            </div>
                            <div className="text-blue-400 font-bold">{calTotalPriceEachProduct(item)}</div>
                        </div>
                        <div>
                            <textarea
                                className="border-0 flex-grow outline-none my-1.5 px-1 w-full h-[35px] resize-none"
                                placeholder="Thêm ghi chú ...."
                                onChange={e => handleChangeNote(e, item)} 
                                defaultValue={item.note}
                            ></textarea>
                        </div>
                        <div className="flex justify-end">
                            <div className="flex gap-2 justify-end items-center">
                                <button
                                    onClick={() => handleRemoveItem(item)}
                                    className="mr-3"
                                    type="button"
                                >
                                    <img src={IconCancel} alt="" />
                                </button>
                                <button type="button"
                                onClick={() => decreaseCount(item)}
                                ><img src={IconMinus} /></button>
                                <span
                                onChange={e => handleChangeQuantity(e, item)} 
                                >{item.quantity}</span>
                                <button type="button"
                                onClick={() => increaseCount(item)}
                                ><img src={IconPlus} /></button>
                            </div>
                        </div>

                    </div>
                </div>
                <div 
                className={" px-3 transition-1s overflow-hidden " + (menuShowList ? 'my-2' : '')}
                style={{maxHeight:(menuShowList ? '500px' : '0')}}
                >
                    <div className="">
                        <div className="flex items-center gap-4">
                            {/* Size */}
                            <div className="w-[100px]">Size:</div>
                            <FormControl sx={{ marginTop: "-5px" }} >
                                <RadioGroup
                                    row
                                    aria-labelledby="demo-row-radio-buttons-group-label"
                                    name="paymentMethod"
                                >
                                    <FormControlLabel
                                        sx={{ marginLeft: "0", fontSize: "13px", marginRight: "27px" }}
                                        value="1"
                                        onChange={() => handleChangeValue(item, 'size', '1')}
                                        checked={item.size == '1' ? true : false}
                                        control={
                                            <Radio
                                                style={{}}
                                                icon={<img src={CheckBoxEmpty} alt="" />}
                                                checkedIcon={<img src={CheckedBox} alt="" />}
                                            />
                                        }
                                        label={<span className="text-[13px]">M</span>}
                                    />
                                    <FormControlLabel
                                        sx={{ marginLeft: "0" }}
                                        value="2"
                                        onChange={() => handleChangeValue(item, 'size', "2")}
                                        checked={item.size == "2" ? true : false}
                                        control={
                                            <Radio
                                                style={{}}
                                                icon={<img src={CheckBoxEmpty} alt="" />}
                                                checkedIcon={<img src={CheckedBox} alt="" />}
                                            />
                                        }
                                        label={<span className="text-[13px]">L</span>}
                                    />
                                </RadioGroup>
                            </FormControl>
                        </div>
                        <div className="flex items-center gap-4">
                            {/* Đường */}
                            <div className="w-[100px]">Đường:</div>
                            <FormControl sx={{ marginTop: "-5px" }} >
                                <RadioGroup
                                    row
                                    aria-labelledby="demo-row-radio-buttons-group-label"
                                    name="paymentMethod"
                                >
                                    <FormControlLabel
                                        sx={{ marginLeft: "0", fontSize: "13px" }}
                                        value="1"
                                        onChange={() => handleChangeValue(item, 'sugar', "1")}
                                        checked={item.sugar == "1" ? true : false}
                                        control={
                                            <Radio
                                                style={{}}
                                                icon={<img src={CheckBoxEmpty} alt="" />}
                                                checkedIcon={<img src={CheckedBox} alt="" />}
                                            />
                                        }
                                        label={<span className="text-[13px]">100</span>}
                                    />
                                    <FormControlLabel
                                        sx={{ marginLeft: "0" }}
                                        value="2"
                                        onChange={() => handleChangeValue(item, 'sugar', "2")}
                                        checked={item.sugar == "2" ? true : false}
                                        control={
                                            <Radio
                                                style={{}}
                                                icon={<img src={CheckBoxEmpty} alt="" />}
                                                checkedIcon={<img src={CheckedBox} alt="" />}
                                            />
                                        }
                                        label={<span className="text-[13px]">70</span>}
                                    />
                                    <FormControlLabel
                                        sx={{ marginLeft: "0", fontSize: "13px" }}
                                        value="3"
                                        onChange={() => handleChangeValue(item, 'sugar', "3")}
                                        checked={item.sugar == "3" ? true : false}
                                        control={
                                            <Radio
                                                style={{}}
                                                icon={<img src={CheckBoxEmpty} alt="" />}
                                                checkedIcon={<img src={CheckedBox} alt="" />}
                                            />
                                        }
                                        label={<span className="text-[13px]">50</span>}
                                    />
                                    <FormControlLabel
                                        sx={{ marginLeft: "0" }}
                                        value="4"
                                        onChange={() => handleChangeValue(item, 'sugar', "4")}
                                        checked={item.sugar == "4" ? true : false}
                                        control={
                                            <Radio
                                                style={{}}
                                                icon={<img src={CheckBoxEmpty} alt="" />}
                                                checkedIcon={<img src={CheckedBox} alt="" />}
                                            />
                                        }
                                        label={<span className="text-[13px]">30</span>}
                                    />
                                    <FormControlLabel
                                        sx={{ marginLeft: "0" }}
                                        value="5"
                                        onChange={() => handleChangeValue(item, 'sugar', "5")}
                                        checked={item.sugar == "5" ? true : false}
                                        control={
                                            <Radio
                                                style={{}}
                                                icon={<img src={CheckBoxEmpty} alt="" />}
                                                checkedIcon={<img src={CheckedBox} alt="" />}
                                            />
                                        }
                                        label={<span className="text-[13px]">0</span>}
                                    />
                                </RadioGroup>
                            </FormControl>
                        </div>
                        <div className="flex items-center gap-4">
                            {/* Đá */}
                            <div className="w-[100px]">Đá:</div>
                            <FormControl sx={{ marginTop: "-5px" }} >
                                <RadioGroup
                                    row
                                    aria-labelledby="demo-row-radio-buttons-group-label"
                                    name="paymentMethod"
                                >
                                    <FormControlLabel
                                        sx={{ marginLeft: "0", fontSize: "13px" }}
                                        value="1"
                                        onChange={() => handleChangeValue(item, 'ice', "1")}
                                        checked={item.ice == "1" ? true : false}
                                        control={
                                            <Radio
                                                style={{}}
                                                icon={<img src={CheckBoxEmpty} alt="" />}
                                                checkedIcon={<img src={CheckedBox} alt="" />}
                                            />
                                        }
                                        label={<span className="text-[13px]">100</span>}
                                    />
                                    <FormControlLabel
                                        sx={{ marginLeft: "0" }}
                                        value="2"
                                        onChange={() => handleChangeValue(item, 'ice', "2")}
                                        checked={item.ice == "2" ? true : false}
                                        control={
                                            <Radio
                                                style={{}}
                                                icon={<img src={CheckBoxEmpty} alt="" />}
                                                checkedIcon={<img src={CheckedBox} alt="" />}
                                            />
                                        }
                                        label={<span className="text-[13px]">70</span>}
                                    />
                                    <FormControlLabel
                                        sx={{ marginLeft: "0", fontSize: "13px" }}
                                        value="3"
                                        onChange={() => handleChangeValue(item, 'ice', "3")}
                                        checked={item.ice == "3" ? true : false}
                                        control={
                                            <Radio
                                                style={{}}
                                                icon={<img src={CheckBoxEmpty} alt="" />}
                                                checkedIcon={<img src={CheckedBox} alt="" />}
                                            />
                                        }
                                        label={<span className="text-[13px]">50</span>}
                                    />
                                    <FormControlLabel
                                        sx={{ marginLeft: "0" }}
                                        value="4"
                                        onChange={() => handleChangeValue(item, 'ice', "4")}
                                        checked={item.ice == "4" ? true : false}
                                        control={
                                            <Radio
                                                style={{}}
                                                icon={<img src={CheckBoxEmpty} alt="" />}
                                                checkedIcon={<img src={CheckedBox} alt="" />}
                                            />
                                        }
                                        label={<span className="text-[13px]">30</span>}
                                    />
                                    <FormControlLabel
                                        sx={{ marginLeft: "0" }}
                                        value="5"
                                        onChange={() => handleChangeValue(item, 'ice', "5")}
                                        checked={item.ice == "5" ? true : false}
                                        control={
                                            <Radio
                                                style={{}}
                                                icon={<img src={CheckBoxEmpty} alt="" />}
                                                checkedIcon={<img src={CheckedBox} alt="" />}
                                            />
                                        }
                                        label={<span className="text-[13px]">0</span>}
                                    />
                                </RadioGroup>
                            </FormControl>
                        </div>
                    </div>
                    <div>
                        {/* topping */}
                        <div>Topping:</div>
                        <div className="flex flex-wrap w-full gap-3">
                            {!!item?.variants?.length && item.variants.map((variant: any) => (
                                <div key={variant._id} className="w-1/4 flex gap-2 items-start">
                                    <FormControl sx={{ marginTop: "-5px" }}>
                                        <FormControlLabel
                                            sx={{ marginLeft: "0", marginRight: "0", fontSize: "13px", alignItems: "flex-start", }}
                                            value={variant._id}
                                            id={variant._id}
                                            onChange={e => handleChooseVariant(e, item._id, variant, item.createdAt)}
                                            control={
                                                <Checkbox
                                                    sx={{ minWidth: "34px", }}
                                                    icon={<img src={CheckBoxEmpty} alt="" />}
                                                    checkedIcon={<img src={CheckedBox} alt="" />}
                                                />
                                            }
                                            label={<div className="text-[13px]" style={{ paddingTop: "7px" }}>{`${variant.name} (${returnVariantPrice(variant)})`}</div>}
                                        />
                                    </FormControl  >
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}