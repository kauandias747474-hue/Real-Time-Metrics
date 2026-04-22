import grpc
import sys
import os

sys.path.append(os.path.dirname(os.path.abspath(__file__)))

import telemetry_pb2
import telemetry_pb2_grpc

def run():
    channel = grpc.insecure_channel('localhost:50051')
    stub = telemetry_pb2_grpc.MetricsIngestorStub(channel)

    # O gRPC Stream exige um iterador (um gerador de dados)
    def generate_metrics():
        messages = [
            telemetry_pb2.MetricRequest(sensor_id="PYTHON_01", value=25.5),
            telemetry_pb2.MetricRequest(sensor_id="PYTHON_02", value=30.2)
        ]
        for m in messages:
            print(f"Enviando: {m.sensor_id}")
            yield m

    try:
        print("Conectando ao Stream do Rust...")
      
        response = stub.SendMetricsStream(generate_metrics(), timeout=5)
        print(f" Resposta do Rust: {response.message}")

    except AttributeError:
        print(" Erro: A função SendMetricsStream não foi encontrada no stub.")
    except grpc.RpcError as e:
        print(f" Erro de RPC: {e.code()} - {e.details()}")

if __name__ == '__main__':
    run()
