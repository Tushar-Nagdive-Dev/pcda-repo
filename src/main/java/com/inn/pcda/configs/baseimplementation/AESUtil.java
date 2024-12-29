package com.inn.pcda.configs.baseimplementation;

import javax.crypto.Cipher;
import javax.crypto.SecretKey;
import javax.crypto.spec.IvParameterSpec;
import javax.crypto.spec.SecretKeySpec;

import org.springframework.stereotype.Component;

import java.util.Base64;

@Component
public class AESUtil {
    private static final String ALGORITHM = "AES";
    private static final String CIPHER_TRANSFORMATION = "AES/CBC/PKCS5Padding";

    // Static AES Key (32 bytes for AES-256, 16 bytes for AES-128)
    private static final String STATIC_KEY = "1P9023D83217C83OLAQNSW2332QWQWAQ"; // 32 chars = 256-bit key

    /**
     * Creates a static SecretKey from the predefined key string.
     */
    private static SecretKey getStaticKey() {
        return new SecretKeySpec(STATIC_KEY.getBytes(), ALGORITHM);
    }

    /**
     * Generates a random IV (Initialization Vector).
     */
    private static IvParameterSpec generateIv() {
        byte[] ivBytes = new byte[16]; // AES block size is 16 bytes
        new java.security.SecureRandom().nextBytes(ivBytes);
        return new IvParameterSpec(ivBytes);
    }

    /**
     * Encrypts the given data using AES with the static key.
     * The IV is generated internally and prepended to the ciphertext.
     */
    public String encrypt(String data) throws Exception {
        SecretKey key = getStaticKey();
        IvParameterSpec iv = generateIv(); // Generate IV internally
        Cipher cipher = Cipher.getInstance(CIPHER_TRANSFORMATION);
        cipher.init(Cipher.ENCRYPT_MODE, key, iv);
        byte[] encryptedData = cipher.doFinal(data.getBytes());

        // Prepend IV to the encrypted data
        byte[] ivAndEncryptedData = new byte[iv.getIV().length + encryptedData.length];
        System.arraycopy(iv.getIV(), 0, ivAndEncryptedData, 0, iv.getIV().length);
        System.arraycopy(encryptedData, 0, ivAndEncryptedData, iv.getIV().length, encryptedData.length);

        return Base64.getEncoder().encodeToString(ivAndEncryptedData);
    }

    /**
     * Decrypts the given data using AES with the static key.
     * The IV is extracted from the start of the ciphertext.
     */
    public String decrypt(String encryptedData) throws Exception {
        SecretKey key = getStaticKey();
        byte[] ivAndEncryptedData = Base64.getDecoder().decode(encryptedData);

        // Extract IV
        byte[] ivBytes = new byte[16]; // AES block size is 16 bytes
        System.arraycopy(ivAndEncryptedData, 0, ivBytes, 0, ivBytes.length);
        IvParameterSpec iv = new IvParameterSpec(ivBytes);

        // Extract encrypted data
        byte[] encryptedBytes = new byte[ivAndEncryptedData.length - ivBytes.length];
        System.arraycopy(ivAndEncryptedData, ivBytes.length, encryptedBytes, 0, encryptedBytes.length);

        Cipher cipher = Cipher.getInstance(CIPHER_TRANSFORMATION);
        cipher.init(Cipher.DECRYPT_MODE, key, iv);
        byte[] decryptedData = cipher.doFinal(encryptedBytes);

        return new String(decryptedData);
    }

    /* public static void main(String[] args) throws Exception {
        String data = "Sensitive Data";
        String encrypted = new AESUtil().encrypt(data);
        System.out.println("Encrypted: " + encrypted);

        String decrypted = new AESUtil().decrypt(encrypted);
        System.out.println("Decrypted: " + decrypted);
    } */
}
