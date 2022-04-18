package com.bizmap.util;

import lombok.extern.slf4j.Slf4j;

@Slf4j
public class BizmapUtil {
    /**
     * null check
     * @param str
     * @return
     */
    public static boolean isEmpty(Object str) {
        return str == null || "".equals(str);
    }
}
