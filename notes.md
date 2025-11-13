# images template

data-src - Path to your image (required)
data-caption - Caption text with HTML support (optional)
data-size - Size: 'full', 'large', 'medium', or 'small' (default: 'large')

<div class="tutorial-image-template" 
     data-src="../../assets/images/fps.png"
     data-caption="<strong>Figure 1:</strong> Your caption text here."
     data-size="large"></div>

cd "C:\Users\vanga\OneDrive\Desktop\Az\portfolio github\portfolio"
bundle exec jekyll serve

Perfect — that job listing you shared is _exactly_ the kind of high-performance ML systems role where you need to prove you can:

- Train large models efficiently (distributed + mixed precision)
- Optimize inference (quantization, pruning, KV cache)
- Build scalable, production-ready training pipelines

Let’s build you a **roadmap and project portfolio** that makes you look like you’ve already _done_ that work.
Everything below can be done **on Colab / local machine / cloud credits** and is resume-ready.

---

## 🧭 ROADMAP OVERVIEW (3–4 Months)

You’ll build three strong projects that map **exactly** to the job description:

| Phase                                      | Focus Area                                        | Main Skills                                          | Resume-ready Project                                      |
| ------------------------------------------ | ------------------------------------------------- | ---------------------------------------------------- | --------------------------------------------------------- |
| **1. Distributed Training Fundamentals**   | PyTorch DDP, FSDP, ZeRO                           | DDP, NCCL, mixed precision                           | Multi-GPU ResNet training pipeline                        |
| **2. Large Model Training & Optimization** | Transformers, quantization, pruning, distillation | FSDP, QAT/PTQ/AWQ, Flash Attention                   | Quantized/distilled Transformer for inference             |
| **3. Scalable Serving**                    | Deployment, caching, autoscaling                  | TorchServe/FastAPI, KV cache optimization, vector DB | End-to-end inference service with caching & vector search |

---

## 🚀 PHASE 1 — Distributed Training (Foundations)

**Goal:** Show you can train efficiently using PyTorch Distributed.

**Skills:** DDP, FSDP, ZeRO, AMP (automatic mixed precision), gradient accumulation, checkpointing.

**Project: “Multi-GPU Distributed Training of ResNet-50 on CIFAR-100”**

- Implement `torch.distributed.launch` or `torchrun` for multi-GPU DDP.
- Add **mixed precision (AMP)** for speed and memory efficiency.
- Log throughput and scaling efficiency.
- Add **checkpointing + resume** support.
- Use **FSDP (Fully Sharded Data Parallel)** to handle larger models.

**Deliverables:**

- GitHub repo with code and README.
- Benchmark comparison (1 GPU vs 4 GPUs).
- Resume bullet:
  _“Implemented distributed training with DDP and FSDP on CIFAR-100, achieving 3.2× speedup and 45% GPU memory reduction via mixed precision.”_

---

## ⚙️ PHASE 2 — Model Optimization for Inference

**Goal:** Optimize Transformer inference for speed and memory.

**Skills:** PTQ/QAT (quantization), pruning, distillation, AWQ/GPTQ, KV-cache optimization, Flash Attention.

**Project: “Optimized Transformer Inference with Quantization and KV-Cache”**

- Start with a small LLM or BERT variant (DistilBERT / GPT-2 small).
- Quantize it using:

  - **PTQ** (Post Training Quantization)
  - **QAT** (Quantization Aware Training)
  - **AWQ** or **GPTQ** (weight-only quantization)

- Add **KV-cache** optimization for fast autoregressive decoding.
- Implement **Flash Attention** (using xFormers or PyTorch 2.0 attention kernels).
- Measure latency and memory improvements.

**Deliverables:**

- Before/after latency benchmarks.
- Resume bullet:
  _“Optimized Transformer inference using PTQ/AWQ quantization and KV-cache, achieving 2.5× speedup and 60% memory reduction with minimal accuracy loss.”_

---

## 🌐 PHASE 3 — Scalable Serving and Vector Search

**Goal:** Show you can deploy and scale inference like an engineer, not just train models.

**Skills:** FastAPI, TorchServe, autoscaling, batching, caching, FAISS/Milvus/Pinecone.

**Project: “Scalable Embedding Search and Inference Service”**

- Serve your optimized Transformer via **FastAPI** or **TorchServe**.
- Implement **request batching** and **GPU caching**.
- Integrate **FAISS** or **pgvector** for vector similarity search.
- Add **autoscaling mock** (simulate multiple replicas locally with load balancing).
- Profile latency and throughput.

**Deliverables:**

- REST API endpoint for embedding + inference.
- Benchmark report for latency per request.
- Resume bullet:
  _“Built scalable Transformer inference service with batching, KV caching, and FAISS vector retrieval; achieved 80% latency reduction under high concurrency.”_

---

## 🧩 BONUS (If You Have Time)

- **Flash Attention research project:** Implement custom attention kernels or integrate xFormers Flash Attention into an existing model.
- **ZeRO or DeepSpeed project:** Train a model using DeepSpeed ZeRO-3 or FSDP to show large-scale handling experience.

---

## 📘 RESOURCES TO STUDY

| Topic         | Resource                                                                                                                           |
| ------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| DDP / FSDP    | PyTorch Distributed Overview, [PyTorch Tutorials: Distributed Training](https://pytorch.org/tutorials/beginner/dist_overview.html) |
| Quantization  | PyTorch Quantization docs, [GPTQ/AWQ papers + repos](https://github.com/mit-han-lab/llm-awq)                                       |
| KV Cache      | HuggingFace Accelerate docs, [HuggingFace Transformers caching](https://huggingface.co/docs/transformers/perf_infer_gpu_one)       |
| Serving       | TorchServe, FastAPI, BentoML                                                                                                       |
| Vector Search | FAISS, Milvus, Pinecone, pgvector                                                                                                  |

About the job
Senior AI Engineer - Video Search (Applied Research & Product)

Remote - United States

About the Company

We’re partnering with a U.S-based applied AI company building next-generation real-time video understanding systems deployed at scale across enterprise, government, and public environments. The platform combines cutting-edge multimodal AI, vector search, and high-performance inference pipelines to make visual data searchable, interpretable, and actionable in real time.

This is a chance to join a well-funded, mission-driven organization with over tens of thousands of active camera streams and a rapidly growing R&D team pushing the boundaries of multimodal retrieval and AI systems design.

The Role

We’re looking for a Senior AI Engineer to lead the applied research and productionization of our video search and retrieval stack - connecting natural-language queries to high-dimensional video representations with real-time performance.

You’ll work at the intersection of deep learning research, scalable systems, and GPU-optimized inference, owning models and pipelines end-to-end from training through deployment.

What You’ll Do

Design and build natural-language-to-video retrieval systems using state-of-the-art architectures (e.g., V-JEPA, CLIP, SigLIP, Video-LLMs, ViViT, TimeSformer).
Develop temporal localization and video summarization capabilities with fine-grained moment-level embeddings.
Stand up vector search infrastructure (FAISS, Milvus, pgvector, Pinecone) with optimized sharding, caching, and hybrid retrieval strategies.
Optimize GPU inference and serving pipelines using ONNX Runtime, TensorRT, or ROCm for low-latency performance.
Drive multi-GPU training and distributed serving (FSDP, ZeRO, DDP, NCCL/RCCL) with strong understanding of parallelization and quantization techniques.
Collaborate with MLOps, backend, and product teams to deliver production-ready AI features at scale.
Define and track key retrieval and relevance metrics (R@K, mAP, nDCG) and run live A/B evaluations.
Mentor junior engineers, document design decisions, and drive innovation through rigorous experimentation.

What We’re Looking For

6-10+ years of experience in machine learning or applied AI, with 4+ years focused on video understanding, multimodal retrieval, or transformer-based models.
Proficiency in PyTorch and deep learning frameworks; experience with video backbones, contrastive training, and representation learning.
Strong understanding of vector databases, ANN search (HNSW, IVF), and embedding pipelines.
Demonstrated ability to ship high-performance AI systems with GPU optimization, ONNX/TensorRT, or ROCm pipelines.
Experience with distributed training, CI/CD for ML, and scalable data pipelines (MLflow, W&B, K8s, Docker).
Excellent communication skills and a collaborative, low-ego approach to problem solving.

Nice-to-Haves

Experience with temporal detection, video tracking, or re-ID.
Exposure to Video-RAG or structured retrieval (metadata + knowledge graph).
Background in real-time or edge inference systems.
Interest in privacy-preserving or regulated AI systems.

Compensation & Logistics

Compensation: Competitive base salary + bonus + equity
Location: Fully remote (U.S. based)

Why Join

Build real-world AI that operates at scale and latency levels few companies ever reach.
Collaborate with world-class engineers and researchers in a fast-paced, mission-oriented environment.
Work on deep technical challenges - multimodal search, retrieval, inference optimization - with real-world outcomes.
