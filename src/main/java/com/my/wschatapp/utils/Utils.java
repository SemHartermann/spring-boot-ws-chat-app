package com.my.wschatapp.utils;

public class Utils {

    public static int fact(int N) {
        if (N <= 1) return 1;
        else return N * fact(N - 1);
    }

    public static int C(int n, int k) {
        return fact(n) / (fact(k) * fact(n - k));
    }

}
