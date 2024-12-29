package com.inn.pcda.users.service;


import com.inn.pcda.users.dto.OfficerDetailsDTO;
import com.inn.pcda.users.entity.Users;

public interface IUserReLoginService {

   OfficerDetailsDTO getOfficerByAccountNo(String accountNo);

   public Users updateUser(OfficerDetailsDTO officerDetailsDTO) throws Exception;

}
