use tonic::{Request, Response, Status};
use crate::telemetry::{self, metrics_ingestor_server::MetricsIngestor};

use crate::storage::DataSink; 

pub struct MyMetrics {
    pub sink: DataSink,
}

#[tonic::async_trait]
impl MetricsIngestor for MyMetrics {
    // 1. Método principal corrigindo o tipo f32/f64
    async fn ingest_metric(
        &self,
        request: Request<telemetry::MetricRequest>,
    ) -> Result<Response<telemetry::MetricResponse>, Status> {
        let req = request.into_inner();
        

        self.sink.save_metric(&req.sensor_id, req.value as f64);

        Ok(Response::new(telemetry::MetricResponse {
            message: format!("Métrica de {} recebida!", req.sensor_id),
        }))
    }

  
    async fn send_metrics_stream(
        &self,
        _request: Request<tonic::Streaming<telemetry::MetricRequest>>,
    ) -> Result<Response<telemetry::MetricResponse>, Status> {
        Err(Status::unimplemented("Stream ainda não implementado"))
    }

    async fn get_metrics_batch(
        &self,
        _request: Request<telemetry::BatchRequest>,
    ) -> Result<Response<telemetry::BatchResponse>, Status> {
        Ok(Response::new(telemetry::BatchResponse {
            metrics: vec![],
        }))
    }
}
