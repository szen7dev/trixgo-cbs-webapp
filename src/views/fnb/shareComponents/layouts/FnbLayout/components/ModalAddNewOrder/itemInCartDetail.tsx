import { FC, useState } from "react";

import Close from "assets/icons/Close";
import { useModal } from "services/hooks/useModal";
import IconMinus from "assets/images/icons8-reduce-96 1.svg";
import ItemSample from "assets/images/icons8-beverage-100.svg";
import IconPlus from "assets/images/icons8-add-new-100 1.svg";
import CheckBoxEmpty from "assets/images/Frame 3548.svg";
import CheckedBox from "assets/images/Check-All.svg";
import RadioEmpty from "assets/images/Ellipse 27.svg";
import RadioChecked from "assets/images/icons8-checked-40 (2) 2.svg";
import IconSearch from "assets/images/icons8-search-96 1.svg";
import DemoTraSua from "assets/images/image 430.png";
import IconCancel from "assets/images/icons8-cancel-96 1.svg";
import { Checkbox, FormControl, FormControlLabel, Radio, RadioGroup } from "@mui/material";

export const ItemInCartMenu : FC = () =>  {
    const [menuShowList, setMenuState] = useState(false);
    return (
        <div className="">
            <div className="border-b-0.5 mb-2 bg-white">
                <div className="flex gap-2 w-full border-b-0.5 py-2 pl-3 pr-3">
                    <img src={DemoTraSua} alt="item" className="w-[44px] h-[44px]" />
                    <div className="w-full">
                        <div className="flex justify-between">
                            <div>
                                <p className="font-bold truncate" onClick={() => setMenuState(!menuShowList)}>
                                    Trà Sữa Trân Châu Đường Đen Kem Trứng
                                </p>
                            </div>
                            <div className="text-blue-400 font-bold">25.000</div>
                        </div>
                        <div>
                            <textarea
                                className="border-0 flex-grow outline-none my-1.5 px-1 w-full h-[35px] resize-none"
                                placeholder="Thêm ghi chú ...."
                            //   onChange={e => handleChangeNote(e, itemInCart)} 
                            //   defaultValue={itemInCart.note}
                            ></textarea>
                        </div>
                        {/* <div className="flex gap-2 justify-end"> */}
                        <div className="flex justify-end">
                            {/* <span>Số lượng: </span> */}
                            <div className="flex gap-2 justify-end items-center">
                                <button
                                    // onClick={() => handleRemoveItemFromBoard(member)}
                                    className="mr-3"
                                >
                                    <img src={IconCancel} alt="" />
                                </button>
                                <button type="button"
                                // onClick={() => decreaseCount(itemInCart)}
                                ><img src={IconMinus} /></button>
                                <span
                                // onChange={e => handleChangeQuantity(e, itemInCart)} 
                                >1</span>
                                <button type="button"
                                // onClick={() => increaseCount(itemInCart)}
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
                                        // onChange={() => handleChangeType('off', product)}
                                        // checked={(product.statusApp == 'off' || !product.statusApp) ? true : false}
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
                                        // onChange={() => handleChangeType('app', product)}
                                        // checked={product.statusApp == 'app' ? true : false}
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
                                        // onChange={() => handleChangeType('off', product)}
                                        // checked={(product.statusApp == 'off' || !product.statusApp) ? true : false}
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
                                        // onChange={() => handleChangeType('app', product)}
                                        // checked={product.statusApp == 'app' ? true : false}
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
                                        // onChange={() => handleChangeType('off', product)}
                                        // checked={(product.statusApp == 'off' || !product.statusApp) ? true : false}
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
                                        // onChange={() => handleChangeType('app', product)}
                                        // checked={product.statusApp == 'app' ? true : false}
                                        control={
                                            <Radio
                                                style={{}}
                                                icon={<img src={CheckBoxEmpty} alt="" />}
                                                checkedIcon={<img src={CheckedBox} alt="" />}
                                            />
                                        }
                                        label={<span className="text-[13px]">30</span>}
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
                                        // onChange={() => handleChangeType('off', product)}
                                        // checked={(product.statusApp == 'off' || !product.statusApp) ? true : false}
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
                                        // onChange={() => handleChangeType('app', product)}
                                        // checked={product.statusApp == 'app' ? true : false}
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
                                        // onChange={() => handleChangeType('off', product)}
                                        // checked={(product.statusApp == 'off' || !product.statusApp) ? true : false}
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
                                        // onChange={() => handleChangeType('app', product)}
                                        // checked={product.statusApp == 'app' ? true : false}
                                        control={
                                            <Radio
                                                style={{}}
                                                icon={<img src={CheckBoxEmpty} alt="" />}
                                                checkedIcon={<img src={CheckedBox} alt="" />}
                                            />
                                        }
                                        label={<span className="text-[13px]">30</span>}
                                    />
                                </RadioGroup>
                            </FormControl>
                        </div>
                    </div>
                    <div>
                        {/* topping */}
                        <div>Topping:</div>
                        <div className="flex flex-wrap w-full">
                            <div className="w-1/3 flex gap-2 items-start px-1">
                                <FormControl sx={{ marginTop: "-5px" }} >
                                    <FormControlLabel
                                        sx={{ marginLeft: "0", marginRight: "0", fontSize: "13px", alignItems: "flex-start", }}
                                        // value={variant._id}
                                        // id={variant._id}
                                        // onChange={e => handleChooseVariant(e, itemInCart._id, variant)}
                                        control={
                                            <Checkbox
                                                sx={{ minWidth: "34px", }}
                                                icon={<img src={CheckBoxEmpty} alt="" />}
                                                checkedIcon={<img src={CheckedBox} alt="" />}
                                            />
                                        }
                                        label={<div className="text-[13px]" style={{ paddingTop: "7px" }}>
                                            Pudding trứng (6k)
                                        </div>}
                                    />
                                </FormControl  >
                            </div>
                            <div className="w-1/3 flex gap-2 items-start px-1">
                                <FormControl sx={{ marginTop: "-5px" }} >
                                    <FormControlLabel
                                        sx={{ marginLeft: "0", marginRight: "0", fontSize: "13px", alignItems: "flex-start", }}
                                        // value={variant._id}
                                        // id={variant._id}
                                        // onChange={e => handleChooseVariant(e, itemInCart._id, variant)}
                                        control={
                                            <Checkbox
                                                sx={{ minWidth: "34px", }}
                                                icon={<img src={CheckBoxEmpty} alt="" />}
                                                checkedIcon={<img src={CheckedBox} alt="" />}
                                            />
                                        }
                                        label={<div className="text-[13px]" style={{ paddingTop: "7px" }}>
                                            Pudding trứng (6k)
                                        </div>}
                                    />
                                </FormControl  >
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
