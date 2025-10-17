// src/components/common/footer/FooterOne.jsx
import React from "react";

export default function FooterOne() {
    return (
        <footer className="bg-purple-700 text-white py-6 mt-12">
            <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-4">
                <p className="text-sm md:text-base">
                    &copy; {new Date().getFullYear()} QuizZone. Sva prava zadržana.
                </p>
                <div className="flex gap-4 mt-2 md:mt-0">
                    <button className="hover:text-gray-300 transition">Politika privatnosti</button>
                    <button className="hover:text-gray-300 transition">Kontakt</button>
                    <button className="hover:text-gray-300 transition">Pomoć</button>

                </div>
            </div>
        </footer>
    );
}
