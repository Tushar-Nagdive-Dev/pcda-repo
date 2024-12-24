package com.inn.pcda.users.service;

import com.inn.pcda.users.dto.RegistrationRequestDTO;
import com.inn.pcda.users.entity.Users;

public interface IUserReLoginService {

   RegistrationRequestDTO getOfficerByAccountNo(String accountNo);
   Users updateUser(Users user);
   String sendOtp(String mobileNumber);
}
