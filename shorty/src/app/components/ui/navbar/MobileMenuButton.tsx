"use client"

import { useState } from "react";
import Button from "../../base/button/Button";
import { FaBars, FaTimes } from "react-icons/fa";

const MobileMenuButton = () => {

    const [isOpen, setIsOpen] = useState(false);

    return (
        <Button
            onClick={() => setIsOpen(!isOpen)}
            variant="ghost"
            className="p-2"
            aria-expanded={isOpen}
            icon={isOpen ? <FaTimes className="h-6 w-6" /> : <FaBars className="h-6 w-6" />}
        >
            <span className="sr-only">Open main menu</span>
        </Button>
    )
}

export default MobileMenuButton