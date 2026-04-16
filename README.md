#  Rust Metrics

![Rust](https://img.shields.io/badge/rust-%23E32A1C.svg?style=for-the-badge&logo=rust&logoColor=white)
![Tokio](https://img.shields.io/badge/runtime-tokio-%2314d1ce?style=for-the-badge)
![License](https://img.shields.io/badge/license-MIT-blue?style=for-the-badge)
![Status](https://img.shields.io/badge/status-active-brightgreen?style=for-the-badge)

🎭 **A Visão / The Vision**

**(PT-BR) O Fim do Gargalo de Telemetria**
Sistemas baseados em GC (Go/Java) sofrem pausas que geram perda de dados em alta escala. O **Rust-Metrics** elimina esse gargalo com processamento **determinístico**.
- **Latência Zero:** Sem Garbage Collector, o tempo de resposta é constante.
- **Eficiência Máxima:** Processa milhões de eventos em um único nó, economizando infraestrutura.

**(EN-US) The End of the Telemetry Bottleneck**
GC-based systems (Go/Java) suffer from pauses that cause data loss at scale. **Rust-Metrics** solves this with **deterministic** processing.
- **Zero Latency:** No Garbage Collector means constant response times.
- **Max Efficiency:** Processes millions of events on a single node, saving infra costs.

---

🏗️ **Arquitetura / Architecture**



**1. Lock-Free Ingestion**
- **PT:** Ring Buffers atômicos (Crossbeam) garantem que a rede nunca bloqueie o motor.
- **EN:** Atomic Ring Buffers (Crossbeam) ensure network threads never block the engine.

**2. SIMD Engine**
- **PT:** Agregação via hardware (instruções vetoriais) para cálculos matemáticos massivos.
- **EN:** Hardware-level aggregation (vector instructions) for massive math calculations.

**3. Zero-Copy Pipeline**
- **PT:** Desserialização direta no buffer de rede (rkyv), evitando alocações na Heap.
- **EN:** Direct deserialization in network buffers (rkyv), avoiding Heap allocations.

---

🛠️ **Arsenal de Ferramentas / The Full Toolchain**

| Camada / Layer | Ferramenta / Tool | Propósito (PT/EN) |
| :--- | :--- | :--- |
| **Runtime** | `Tokio` | I/O Assíncrono massivo / Massive Async I/O. |
| **Parallelism** | `Rayon` | Processamento multithread de dados / Data parallelism. |
| **Serialization** | `Prost / Tonic` | Contratos gRPC rápidos e tipados / Fast typed gRPC. |
| **Performance** | `Criterion.rs` | Benchmarking estatístico rigoroso / Rigorous benchmarking. |
| **Observability** | `Tracing / Opentelemetry` | Rastreamento de latência e logs / Trace and log analysis. |
| **Memory** | `Jemalloc / Mi-malloc` | Alocador de memória otimizado / Optimized memory allocator. |
| **Profiling** | `Flamegraph` | Identificação de hot-spots de CPU / CPU hot-spot analysis. |
| **Validation** | `PropTest` | Testes baseados em propriedades / Property-based testing. |

---

⚡ **Diferenciais / Key Features**

- **Deterministic:** Sem pausas de GC; latência estável em nível de microssegundos.
- **SIMD Optimized:** Redução de consumo de CPU via vetores de processamento de hardware.
- **Lock-Free:** Eliminação de contenção de threads ao evitar `Mutex` em caminhos críticos.
- **CI/CD Ready:** Workflow automatizado para checagem de performance (Benchmark Regression).

---

👨‍💻 **Por que Rust? / Why Rust?**

**(PT-BR)** Prova de conceito sobre sistemas de missão crítica: unindo a velocidade bruta do C com a segurança absoluta de memória do Rust.
**(EN-US)** Proof of concept for mission-critical systems: merging C's raw speed with Rust's absolute memory safety.

---

🤝 **Contribuição / Contributing**
1. **Fork** -> 2. **Branch** -> 3. **Commit** -> 4. **PR**.

📜 **Licença / License**
MIT License. Free for all.
