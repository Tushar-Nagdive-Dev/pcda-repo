package com.inn.pcda.users.service;

import com.inn.pcda.users.dto.OfficerDetailsDTO;
import com.inn.pcda.users.entity.Users;

public interface IUserReLoginService {

   OfficerDetailsDTO getOfficerByAccountNo(String accountNo);
   Users updateUser(Users user);
   String sendOtp(String mobileNumber);
}
