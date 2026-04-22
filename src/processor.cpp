#include <iostream>
#include <stdint.h>

extern "C" {
    
    float process_metric_native(float value) {
      
        return value * 1.1f;
    }
}
