#include <cmath>
#include <cstddef>

extern "C" {
    // Função para o Rust chamar
    float calculate_std_dev(const float* data, size_t len) {
        if (data == nullptr || len <= 1) return 0.0f;

        float sum = 0.0f;
        for (size_t i = 0; i < len; ++i) sum += data[i];
        float mean = sum / (float)len;

        float squared_diff_sum = 0.0f;
        for (size_t i = 0; i < len; ++i) {
            float diff = data[i] - mean;
            squared_diff_sum += diff * diff;
        }

        return sqrtf(squared_diff_sum / (float)(len - 1));
    }
}
