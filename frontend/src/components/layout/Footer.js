import React, {Fragment} from 'react'

export default function Footer() {
    return (

        <div className="mt-5 mb-5 p-2 border border-transparent border-t-slate-300">
            <footer className="flex mb-10 justify-between text-slate-500">
                <div className="flex flex-row items-center">
                        <p className="p-2 text-md">&copy; Harshvardhan Kedare 2022</p>
                </div>
                <div className="flex flex-row items-center">
                    <a href="https://github.com/Harshvardhan1809" target="_blank" className="p-2 text-md">About Me</a>
                </div>
            </footer>
        </div>

    )
}
