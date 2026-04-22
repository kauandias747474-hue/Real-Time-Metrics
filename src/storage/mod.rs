pub struct DataSink {
    
}

impl DataSink {
    pub fn new() -> Self {
        DataSink {}
    }

  
    pub fn save_metric(&self, metric: &crate::telemetry::MetricRequest) {
        println!(" A guardar métrica: {} -> {}", metric.sensor_id, metric.value);
    }

  
    pub fn log_event(message: &str) {
        println!(" LOG: {}", message);
    }
}
