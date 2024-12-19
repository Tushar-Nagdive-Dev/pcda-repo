import React from 'react';
import {Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter} from "@/components/ui/dialog";
import {Checkbox} from "@/components/ui/checkbox"


function TwoFaTermsAndConditions({isOpen, setIsOpen, isCheckedConditions, setCheckedConditions, handleClose}) {
    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>

            <DialogContent
                onEscapeKeyDown={(e) => e.preventDefault()} // Prevent ESC key from closing the dialog
                onPointerDownOutside={(e) => e.preventDefault()} // Prevent overlay from closing the dialog
                isDisplayClose={false}
                className="!max-w-fit"
            >
                <DialogHeader>
                    <DialogTitle>Terms and Conditions for Two-Factor Authentication (2FA)</DialogTitle>
                </DialogHeader>
                <div className="flex flex-col space-y-4">
                    <p className="font-raleway text-lg text-justify">By using <span
                        className="font-bold"> PCDA(O) Pune</span> website and enabiling two-factor
                        Authentication (2FA), you agree to the following terms :</p>

                    <ul className="list-decimal font-raleway list-inside ml-4 text-justify">
                        <li>Donec a eros justo. Fusce egestas tristique ultrices. Nam tempor, augue nec tincidunt
                            molestie, massa nunc varius arcu, at scelerisque elit erat a magna. Donec quis erat at
                            libero ultrices mollis.
                        </li>

                        <li>Donec a eros justo. Fusce egestas tristique ultrices. Nam tempor, augue nec tincidunt
                            molestie, massa nunc varius arcu, at scelerisque elit erat a magna. Donec quis erat at
                            libero ultrices mollis.
                        </li>

                        <li>Donec a eros justo. Fusce egestas tristique ultrices. Nam tempor, augue nec tincidunt
                            molestie, massa nunc varius arcu, at scelerisque elit erat a magna. Donec quis erat at
                            libero ultrices mollis.
                        </li>
                    </ul>

                    <p className="font-raleway">By Proceeding, you acknowledge that you understand and agree to
                        these terms. </p>

                    <div className="flex items-center space-x-2">
                        <Checkbox id="terms" onCheckedChange={() => setCheckedConditions(prev => !prev)}/>
                        <label
                            htmlFor="terms"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                            Accept terms and conditions
                        </label>
                    </div>

                </div>
                <DialogFooter className="justify-center">
                    <button
                        className="w-fit px-8 rounded-md  py-3 bg-statebluecolor text-white disabled:bg-gray-400 disabled:cursor-not-allowed"
                        disabled={!isCheckedConditions}
                        onClick={() => handleClose()}
                    >
                        Accept
                    </button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

export default TwoFaTermsAndConditions;