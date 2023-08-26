import React, {Fragment, Component} from 'react'; 

export class Account extends Component {

    render(){

        return(

            <div id="hero" class="px-12 pt-1 pb-4 bg-slate-100 h-screen overflow-scroll w-screen">

                <div class="flex justify-between w-full items-center">
                    <div class>
                        <p class="p-4 text-xl">Account</p>
                    </div>
                </div>

                <section class="container">
                    <div class="flex flex-row">
                        <div class="w-4/12 p-4">
                            <div id = "account-card" class="p-4 pb-6 bg-white rounded-[10px] bg-white">
                                <div id="profile-card" class="flex flex-col justify-center items-center">
                                    <div class="w-full">
                                        <img src="../../static/img/profile_picture.jpg" class="mx-auto rounded-full border border-solid" width="175" height="175" alt="" />
                                    </div>
                                    <div class="flex w-full items-end justify-center pb-4 border border-t-0 border-l-0 border-r-0 border-b-2">
                                        <span class="text-sm text-slate-500 mt-[1.25] mr-2">Change profile picture</span>
                                        <button class="">
                                            <i class="fa-solid fa-pen"></i> 
                                        </button>
                                    </div>
                                    <div>
                                        <p class="mt-4 text-2xl">Harshvardhan Kedare</p>
                                    </div>
                                </div>    
                                <div id="accounts-panel" class="mt-2 mb-2 pt-4 border border-t-2 border-l-0 border-r-0 border-b-0">
                                    <div class="pt-1 pb-2 pl-8 text-lg border border-t-0 border-l-0 border-r-0 border-b-2">
                                        <a href="#" id="account-button">Account</a>
                                    </div>
                                    <div class="pt-2 pb-2 pl-8 text-lg border border-t-0 border-l-0 border-r-0 border-b-2">
                                        <a href="#" id="password-button">Password</a>
                                    </div>
                                    <div class="pt-2 pb-2 pl-8 text-lg border border-t-0 border-l-0 border-r-0 border-b-2">
                                        <a href="#" id="permissions-button">Permissions</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="w-8/12 p-4">
                            <div id="account-header" class="bg-white py-8 pr-4 pl-8 mb-2 rounded-[10px]">
                                <p class="text-2xl">Account</p>
                                <p class="text-gray-400 text-base">* Change your personal information</p>
                                <div id="account-body" class="mt-4">
                                    <form action="">
                                        <div class="flex flex-row">
                                            <div class="w-1/2">
                                                <label for="first-name" class="">First Name</label>
                                                <input type="text" class="mt-2 block bg-gray-200 px-4 py-2 w-[275px] rounded-md" value="Harshvardhan" />
                                            </div>
                                            <div class="w-1/2">
                                                <label for="last-name" class="">Last Name</label>
                                                <input type="text" class="mt-2 block bg-gray-200 px-4 py-2 w-[275px] rounded-md" value="Kedare" />
                                            </div>
                                        </div>
                                        <div class="flex flex-row mt-6">
                                            <div class="w-1/2">
                                                <label for="date" class="">Date Joined</label>
                                                <input type="date" class="mt-2 block bg-gray-200 px-4 py-2 w-[275px] rounded-md" value="Harshvardhan" />
                                            </div>
                                            <div class="w-1/2">
                                                <label for="location" class="">Location</label>
                                                <select id="location" class="mt-3 block bg-gray-200 px-4 py-2 w-[275px] rounded-md bg-gray-200">
                                                    <option selected>Location</option>
                                                    <option value="US">Tokyo</option>
                                                    <option value="DE">Chiba</option>
                                                    <option value="CA">Osaka</option>
                                                    <option value="FR">Kyoto</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div class="mt-6">
                                            <div class="w-1/2">
                                                <label for="date" class="">Phone Number</label>
                                                <input type="tel" class="mt-2 block bg-gray-200 px-4 py-2 w-[275px] rounded-md" value="070-XXXX-3594" />
                                            </div> 
                                        </div>
                                        <div class="mt-6">
                                            <div class="w-1/2">
                                                <label for="date" class="">Payment Method</label>
                                                <div class="flex mt-2 block bg-gray-200 px-4 py-2 w-[275px] rounded-md">
                                                    <img src="../../static/img/mastercard.png" alt="no_img" width="30px" height="20px" class="mr-4" />
                                                    <input type="tel" class=" bg-gray-200 " placeholder="1234 XXXX XXXX 5678" />
                                                </div>
                                            </div> 
                                        </div>
                                        <div class="mt-6">
                                            <div class="w-9/12">
                                                <label for="date" class="text-red-600">Delete Account</label>
                                                <span class="mt-2 block text-gray-500 text-sm">By deleting your account, you will lose all your personal information and won't be able to use our services!</span>
                                                <input type="checkbox" id="delete-check" class="mt-2 mr-2" name="delete-check" />
                                                <label for="delete-check" class="mt-2">I wish to delete my account</label><br />
                                                <label for="delete-password" class="mt-4 text-gray-500">Enter your password for confirmation</label>
                                                <input type="password" class="mt-2 block bg-gray-200 px-4 py-2 w-[275px] rounded-md" value="" placeholder="Enter password" />
                                            </div> 
                                        </div>
                                    </form>
                                    <button type="submit" class="block bg-black text-md text-white rounded-md px-5 py-2 mt-5">Submit</button>
                                </div>
                            </div>
                            
                            <div id="password-header" class="hidden bg-white py-8 pr-4 pl-8 mb-2 rounded-[10px]">
                                <p class="text-2xl">Password</p>
                                <p class="text-gray-400 text-base">* Change your password</p>
                                <div id="password-body" class="mt-4">
                                    <form action="">
                                        <div class="flex flex-col">
                                            <div class="mb-4">
                                                <label for="old-password" class="">Old Password</label>
                                                <input type="password" class="mt-2 block bg-gray-200 px-4 py-2 w-[300px] rounded-md" />
                                            </div>
                                            <div class="mb-4">
                                                <label for="new-password" class="">New Password</label>
                                                <input type="password" class="mt-2 block bg-gray-200 px-4 py-2 w-[300px] rounded-md" />
                                            </div>
                                            <div class="mb-4">
                                                <label for="confirm-new-password" class="">Confirm new password</label>
                                                <input type="password" class="mt-2 block bg-gray-200 px-4 py-2 w-[300px] rounded-md" />
                                            </div>
                                        </div>
                                        <div class="mt-4">
                                            <div class="w-9/12">
                                                <label for="date" class="text-red-600">Change my password</label>
                                                <span class="mt-2 block text-gray-500 text-sm">Make sure it's at least 15 characters OR at least 8 characters including a number and a lowercase letter!</span>
                                                <input type="checkbox" id="passwrod-change-check" class="mt-2 mr-2" name="password-change-check" />
                                                <label for="password-change-check" class="mt-2">I wish to change my password</label><br />
                                            </div> 
                                        </div>
                                    </form>
                                    <button type="submit" class="block bg-black text-md text-white rounded-md px-5 py-2 mt-5 mb-2">Submit</button>
                                    <a href="#" class="">Forgot the password?</a>
                                </div>
                            </div>

                            <div id="permissions-header" class="hidden bg-white py-8 pr-4 pl-8 mb-2 rounded-[10px]">
                                <p class="text-2xl">Permissions</p>
                                <p class="text-gray-400 text-base">* Manage your permissions</p>
                                <div id="password-body" class="mt-4">
                                    <form action="">
                                        <div class="flex flex-col">
                                            <div class="mb-3 w-10/12">
                                                <input type="checkbox" id="password-change-check" class="mt-2 mr-2" name="password-change-check" />    
                                                <label for="old-password" class="">Allow emails regarding our services</label>
                                                <p class="pb-4 text-gray-500 text-sm">We periodically send emails to our users regarding upgrades, new features and services and offers on PRO version</p>
                                            </div>
                                            <div class="mb-3 w-10/12">
                                                <input type="checkbox" id="password-change-check" class="mt-2 mr-2" name="password-change-check" />    
                                                <label for="old-password" class="">Allow cookies</label>
                                                <p class="pb-4 text-gray-500 text-sm">We use cookies for Javascript functionality. Accept cookies to enhance user-experience</p>
                                            </div>
                                            <div class="mb-3 w-10/12">
                                                <input type="checkbox" id="password-change-check" class="mt-2 mr-2" name="password-change-check" />    
                                                <label for="old-password" class="">Allow notifications</label>
                                                <p class="pb-4 text-gray-500 text-sm">We might send notifications to your account if you receive a badge, if you are inactive for many days etc.</p>
                                            </div>
                                        </div>
                                    </form>
                                    <button type="submit" class="block bg-black text-md text-white rounded-md px-5 py-2 mt-2 mb-2">Submit</button>
                                </div>
                            </div>
                        </div>
                    </div>
                
                </section>

            </div>  

        )

    }

}

export default Account