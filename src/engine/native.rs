
extern "C" {

    pub fn execute_heavy_computation();
    pub fn get_cpu_load() -> i32;
}

pub fn run_native_process() {
    println!(" Engine: Solicitando processamento ao C++...");
    unsafe {

        execute_heavy_computation();
        let load = get_cpu_load();
        println!(" Engine: Carga do Hardware reportada pelo C++: {}%", load);
    }
}
