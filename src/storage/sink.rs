use std::fs::OpenOptions;
use std::io::Write;

pub struct DataSink;

impl DataSink {

    pub fn save_metric(sensor_id: &str, value: f64) {
       let line = format!("ID: {}, Valor: {}\n", sensor_id, value);

 
        if let Ok(mut file) = OpenOptions::new().create(true).append(true).open("metrics.db") {
            let _ = file.write_all(line.as_bytes());
        }


        println!(" [STORAGE] Dado persistido: {}", line.trim());
    }
}
