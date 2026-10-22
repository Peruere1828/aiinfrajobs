# 快手（Kuaishou）

> 定位：可灵 AI 带来密集的视频生成/多模态推理系统岗位，覆盖推理框架、Model Serving、GPU 调度与 AIGC 推理引擎，多个岗位明确本科可投。
> 候选人画像：南京大学 CS 本科（2028-06 毕业），熟悉 vLLM / MLIR / CUDA
> 调研时间：2026-10-22。数据来源：快手招聘官网社招/实习职位接口（recruitProjectCode=socialr）抓取 363 条，逐条按 JD 正文筛选三方向；本文件仅保留实习岗位，链接为官网实习职位详情页。
> 本文件由 `data/*.json` 自动生成，请勿手改；如需更新，请修改数据并重新构建。

## 数据源与筛选口径
- 官网：https://zhaopin.kuaishou.cn/recruit/e/#/official/trainee/
- 筛选口径：快手招聘官网社招/实习职位接口（recruitProjectCode=socialr）抓取 363 条，逐条按 JD 正文筛选三方向；本文件仅保留实习岗位，链接为官网实习职位详情页。

## 方向① LLM 推理优化

### 1. AIGC推理系统开发实习生 ★★★
- 官网链接：https://zhaopin.kuaishou.cn/recruit/e/#/official/trainee/job-info/29630
- Base：北京 · AIGC 推理系统
- 内容：参与 Diffusion 推理引擎核心模块开发，落地 Flash Attention、Fused Kernels、INT8/FP8 量化与剪枝蒸馏，并建设 AIGC 网关的高并发请求调度与模型服务化接口。
- 技能要点：CUDA、Triton、TensorRT、量化、FlashAttention、Diffusion、C++、Golang
- 学历：【本科】（JD 原文：计算机科学、人工智能、数学或相关专业本科及以上学历）
- 届别：JD 未限届别；本科及以上可投；批次：日常实习
- 备注：加分项：TensorRT/Triton Inference Server/cutlass、GPTQ/AWQ；JD 未写实习时长。

### 2. Model Serving开发实习生 ★★★
- 官网链接：https://zhaopin.kuaishou.cn/recruit/e/#/official/trainee/job-info/29629
- Base：杭州 / 北京 · Model Serving（杭州）
- 内容：研发大模型推理服务平台与弹性推理引擎，做 Serverless Model、GPU 池化、分布式 KV Cache、CUDA Graph 缓存与模型秒级启停，并建设离线批量推理与统一调度能力。
- 技能要点：vLLM、TensorRT-LLM、SGLang、CUDA、KV Cache、CUDA Graph、Kubernetes、Go
- 学历：【本科】（JD 原文：本科及以上学历，计算机相关专业优先）
- 届别：JD 未限届别；本科及以上在校生可投；批次：日常实习
- 备注：Base 杭州；有 vLLM/SGLang/TensorRT-LLM 之一实际性能优化经验优先；JD 未写实习时长。

### 3. 多元算力AI优化实习生 ★★
- 官网链接：https://zhaopin.kuaishou.cn/recruit/e/#/official/trainee/job-info/28861
- Base：北京 / 上海 · 多元算力 AI 优化
- 内容：做 AIGC 场景的硬件方案与性能优化：分析 LLM 大规模训练集群负载，优化主流 AIGC 模型推理侧性能，并结合 GPU 微架构、集合通信做加速。
- 技能要点：CUDA、PyTorch、TensorFlow、GPU 微架构、性能分析、集合通信、Linux
- 学历：【本科】（JD 原文：本科及以上学历，计算机相关专业，实习4个月以上）
- 届别：JD 未限届别；本科及以上可投，实习 4 个月以上；批次：日常实习
- 备注：训练与推理性能分析各占一部分；本科可投，适合有 CUDA/体系结构基础的候选人。

### 4. 大模型推理框架研发实习生-【可灵AI专项】 ★★★
- 官网链接：https://zhaopin.kuaishou.cn/recruit/e/#/official/trainee/job-info/27530
- Base：北京 · 可灵 AI · 大模型推理框架
- 内容：面向可灵视频生成、多模态与语言大模型，研发低延迟高吞吐推理优化方案，复现高性能算子、量化、分布式并行推理等前沿工作，并参与服务化框架开发。
- 技能要点：C++、Python、CUDA、高性能算子、量化、分布式并行推理、推理框架
- 学历：【未标注】（JD 未写学历门槛；要求熟悉 Linux/C++/Python 与常见推理优化技术）
- 届别：JD 未限届别，未写学历门槛，本科可投；批次：可灵
- 备注：JD 加分项：CUDA 编程、分布式大模型并行推理；官网实习职位页直接投递。

### 5. 容器云AI Infra实习生 ★★
- 官网链接：https://zhaopin.kuaishou.cn/recruit/e/#/official/trainee/job-info/23985
- Base：杭州 · 容器云 AI Infra
- 内容：面向分布式 LLM 推理系统做 GPU/RDMA 底层基础设施与稳定性优化，并基于 Kubernetes 做训练/推理资源调度与成本效率优化。
- 技能要点：vLLM、SGLang、Kubernetes、Docker、GPU、RDMA、Go、Java
- 学历：【本科】（JD 原文：本科及以上学历，计算机相关专业）
- 届别：JD 未限届别；本科及以上可投；批次：日常实习
- 备注：Base 杭州；JD 同时覆盖训练平台优化，投递时突出推理系统与云原生经历。

### 6. 异构计算性能优化实习生 ★★
- 官网链接：https://zhaopin.kuaishou.cn/recruit/e/#/official/trainee/job-info/32408
- Base：北京 · 异构计算性能优化
- 内容：面向大模型训练、AIGC 与推荐业务做 GPU/AI 加速器选型与性能评测，建立异构硬件评测体系，并协同算法/系统团队做算子、显存与通信优化。
- 技能要点：CUDA、ROCm、profiling、GPU 架构、算子优化、显存优化、通信优化
- 学历：【本科】（JD 原文：本科及以上学历；硕士或博士优先）
- 届别：JD 未限届别；本科及以上可投；批次：日常实习
- 备注：偏硬件选型与性能评测；JD 未写实习时长。

### 7. 强化学习框架研发实习生-【可灵】 ★
- 官网链接：https://zhaopin.kuaishou.cn/recruit/e/#/official/trainee/job-info/32562
- Base：上海 / 北京 · 可灵 AI · RL Infra
- 内容：参与可灵 RL Infra 研发，面向多模态理解、图像/视频生成与生成理解统一模型，优化训练、推理、Rollout 与训推一致性链路，落地 Flow GRPO 等新范式。
- 技能要点：veRL、vLLM、SGLang、FSDP、Megatron、Ray、CUDA、Python
- 学历：【本科】（JD 原文：计算机、人工智能等相关专业本科及以上在读）
- 届别：JD 未限届别；本科及以上在读，实习 3 个月以上；批次：可灵
- 备注：岗位以 RL 训练框架为主，含推理/Rollout 链路，不是纯推理优化；Base 上海。

### 8. 推理优化实习生 ★
- 官网链接：https://zhaopin.kuaishou.cn/recruit/e/#/official/trainee/job-info/28999
- Base：北京 · 推理服务编排
- 内容：建设大模型服务编排框架，做多模型多版本并行服务、自动扩缩容、灰度发布与容器化部署，并优化多 GPU 卡/多节点流量调度与推理服务弹性。
- 技能要点：Kubernetes、Docker、Python、Go、Java、流量调度、推理服务编排
- 学历：【本科】（JD 原文：计算机科学、软件工程或相关专业本科及以上在校生）
- 届别：JD 未限届别；本科及以上在校生可投；批次：日常实习
- 备注：偏推理服务编排与平台工程，kernel 优化内容较少；JD 未写实习时长。

### 9. 混合云AI推理研发实习生-【可灵AI】 ★★★
- 官网链接：https://zhaopin.kuaishou.cn/recruit/e/#/official/trainee/job-info/32504
- Base：北京 · 可灵 AI · 混合云推理
- 内容：建设全球化多云异构 AI 推理集群，研发多云算力接入与管理、专有云部署/模型授权，以及多国家多租户场景下的流量优先级调度与算力智能分配。
- 技能要点：vLLM、SGLang、PyTorch、Kubernetes、多云异构、算力调度、Java、Python
- 学历：【本科】（JD 原文：28届及以后毕业，本科及以上学历）
- 届别：JD 明确 28 届及以后，2028-06 本科毕业完全匹配；实习 4 个月以上、每周 4 天以上；批次：可灵
- 备注：本科可投且明确 2028 届，优先级最高一档；偏推理集群与调度平台，非 kernel 开发。

### 10. 高性能GPU调度推理研发实习生-【可灵AI专项】 ★★
- 官网链接：https://zhaopin.kuaishou.cn/recruit/e/#/official/trainee/job-info/30751
- Base：北京 · 可灵 AI · GPU 调度推理
- 内容：负责可灵在线推理服务的 GPU 资源利用，建设 GPU 利用率下钻指标、算力调度、虚拟化混部与模型推理执行流水线，支撑万卡级 GPU 算力平台。
- 技能要点：vLLM、SGLang、PyTorch、Kubernetes、Docker/Containerd、GPU 调度、虚拟化混部
- 学历：【本科】（JD 原文：本科及以上学历，计算机相关专业优先）
- 届别：JD 未限届别；本科及以上可投；批次：可灵
- 备注：偏集群调度与推理执行优化；JD 要求了解容器运行时与 K8s 调度实现。

## 方向② AI 编译器开发

### 1. 搜索后端研发实习生 ★★
- 官网链接：https://zhaopin.kuaishou.cn/recruit/e/#/official/trainee/job-info/25291
- Base：北京 · 搜索 · 在线服务框架
- 内容：研发快手机器学习在线服务框架（搜索场景稀疏模型与大模型推理），结合 CPU/GPU 硬件做性能分析与优化；加分项覆盖 GPU 性能分析、量化剪枝与 TVM/XLA 编译优化。
- 技能要点：C++、Python、CUDA、TVM、XLA、量化、剪枝、在线推理框架
- 学历：【未标注】（JD 未写学历门槛；要求实习期 3 个月以上）
- 届别：JD 未限届别；未写学历门槛；批次：日常实习
- 备注：编译器仅作为加分项（TVM/XLA），不是专职 AI 编译器岗；适合有 MLIR/TVM 基础的候选人补充系统经验。

## 方向③ 世界模型 / VLA / VLM

### 1. 具身智能算法实习生 - 【可灵AI】 ★
- 官网链接：https://zhaopin.kuaishou.cn/recruit/e/#/official/trainee/job-info/30841
- Base：北京 / 深圳 · 可灵 AI · 具身智能
- 内容：探索并落地用于具身智能的世界模型，围绕感知—推理—执行闭环构建具身智能系统。
- 技能要点：世界模型、具身智能、感知-推理-执行、Python
- 学历：【未标注】（JD 未写学历门槛）
- 届别：JD 未限届别；未写学历门槛；批次：可灵
- 备注：偏世界模型算法研究，非推理系统优化；有高水平论文/竞赛奖项优先。

### 2. 视频理解算法实习生-【可灵AI专项】 ★
- 官网链接：https://zhaopin.kuaishou.cn/recruit/e/#/official/trainee/job-info/32338
- Base：北京 · 可灵 AI · 视频理解（Keye）
- 内容：参与视频多模态大模型的数据与算法建设，覆盖视频理解、长视频推理、Video Agent 与数据/评测 pipeline；加分项含 vLLM、TensorRT 等推理部署工具。
- 技能要点：视频理解、VLM、PyTorch、vLLM、TensorRT、数据 pipeline
- 学历：【本科】（JD 原文：在读本科、硕士或博士）
- 届别：JD 未限届别；本科在读可投；批次：可灵
- 备注：偏视频理解算法与数据，推理部署只是加分项；本科可投。

## 跟踪 / 博士 / 排除（本科暂不可投）

### 1. 可灵平台算法工程实习生 ★
- 官网链接：https://zhaopin.kuaishou.cn/recruit/e/#/official/trainee/job-info/31196
- Base：北京 · 可灵 AI · 平台算法工程
- 内容：参与可灵平台推理与模型服务部署框架研发，建设高性能标准化推理系统，并通过软硬件结合优化模型推理性能。
- 技能要点：vLLM、SGLang、PyTorch、Java、Python、推理系统、性能优化
- 学历：【硕士】（JD 原文：预计2027或之后获得硕士及以上学历）
- 届别：JD 要求 2027 年及以后获得硕士学历；2028-06 毕业符合届别，但卡硕士；批次：可灵
- 备注：硕士门槛，2028 本科不可直接投；岗位内容与方向①匹配度高，适合读研后跟踪。

### 2. 大模型小型化算法实习生 ★
- 官网链接：https://zhaopin.kuaishou.cn/recruit/e/#/official/trainee/job-info/20272
- Base：北京 · 大模型小型化
- 内容：探索大模型小型化（蒸馏、量化）与推理策略（投机采样），并在快手业务场景落地；课题覆盖推理加速与 MoE。
- 技能要点：蒸馏、量化、投机采样、CUDA、Triton、PyTorch
- 学历：【硕士】（JD 原文：数学、计算机、自动化、电子系专业硕博生）
- 届别：JD 未限届别；硕博在读，可实习半年以上；批次：日常实习
- 备注：硕博门槛；有 CV/NLP 顶会论文或 CUDA/Triton 开发经验优先。

### 3. 大模型算法实习生 ★
- 官网链接：https://zhaopin.kuaishou.cn/recruit/e/#/official/trainee/job-info/33037
- Base：北京 · 端侧大模型推理
- 内容：对 Qwen 等多模态大模型做微调、量化、剪枝、蒸馏，并基于 llama.cpp 等推理引擎优化移动端推理链路，包括推理加速、算子融合与硬件调度。
- 技能要点：llama.cpp、量化、剪枝、蒸馏、算子融合、C/C++、端侧推理
- 学历：【硕士】（JD 原文：硕士及以上学历）
- 届别：JD 未限届别；硕士及以上可投；批次：日常实习
- 备注：端侧推理方向，硕士门槛；2028 本科不可直接投。

### 4. 大模型训推优化实习岗 ★
- 官网链接：https://zhaopin.kuaishou.cn/recruit/e/#/official/trainee/job-info/27144
- Base：北京 / 深圳 / 杭州 · 大模型训推优化
- 内容：做文生图/文生视频大模型核心算子的 CUDA/Triton 开发与性能优化，优化混合精度量化、低比特/稀疏化、显存管理与计算图调度，探索算子融合/动态编译，并搭建端到端推理流水线。
- 技能要点：CUDA、Triton、vLLM、SGLang、PyTorch、量化、算子优化
- 学历：【硕士】（JD 原文：硕士及以上学历，2年以上CUDA/GPU高性能计算开发经验）
- 届别：JD 未限届别；硕士门槛且要求 2 年以上 CUDA/GPU 经验；批次：日常实习
- 备注：硕士 + 2 年经验门槛，2028 本科不符合；JD 含动态编译/算子融合内容，可作为编译器方向的跟踪项。

### 5. 算法工程 Codesign 实习生-【可灵】 ★
- 官网链接：https://zhaopin.kuaishou.cn/recruit/e/#/official/trainee/job-info/32515
- Base：北京 / 上海 · 可灵 AI · 算法工程 Codesign
- 内容：面向视频 Diffusion 与生成-理解统一架构做 token efficiency 与训推吞吐 Co-design：稀疏注意力、Latent MoE、FP8 低精度训练、关键算子（CUDA/CUTLASS）与并行策略优化。
- 技能要点：CUDA、CUTLASS、Triton、FSDP、TP/CP/EP、FP8、稀疏注意力、vLLM/SGLang
- 学历：【硕士】（JD 原文：计算机科学、人工智能、数学或相关专业硕士及以上学历）
- 届别：JD 未限届别；硕士及以上可投；批次：可灵
- 备注：偏训练系统与架构 Co-design，含推理开销优化；硕士门槛。

### 6. （可灵AI专项）大模型推理系统开发实习生 ★★
- 官网链接：https://zhaopin.kuaishou.cn/recruit/e/#/official/trainee/job-info/27177
- Base：北京 · 可灵 AI · 推理系统
- 内容：搭建多模态内容生成的多阶段分布式推理链路，负责视觉/文本/音频模型服务部署与 pipeline 编排，并研发推理调度引擎、模型服务框架与异构集群算力分配。
- 技能要点：vLLM、SGLang、PyTorch、Java、Python、推理编排、云原生
- 学历：【硕士】（JD 原文：预计2026或之后获得硕士及以上学历）
- 届别：JD 要求 2026 年及以后获得硕士学历；2028-06 毕业符合届别，但卡硕士；批次：可灵
- 备注：硕士门槛，2028 本科不可直接投；可跟踪其推理系统方向，读研后再投。

### 7. （可灵AI专项）大模型算法加速/优化实习生 ★
- 官网链接：https://zhaopin.kuaishou.cn/recruit/e/#/official/trainee/job-info/27889
- Base：北京 / 上海 · 可灵 AI · 算法加速
- 内容：做视频/图像生成模型的少步蒸馏（consistency、shortcut、score distillation）与 Transformer 高效注意力、FP8/FP4 量化训练，推进生成模型实时化。
- 技能要点：Triton、Diffusion、稀疏 Attention、FP8/FP4、QAT、蒸馏
- 学历：【硕士】（JD 原文：硕士及以上学历）
- 届别：JD 未限届别；硕士及以上可投；批次：可灵
- 备注：偏算法与训练侧加速（蒸馏/量化训练），不是 serving 工程岗；硕士门槛。

### 8. 大模型算法实习生（VLM/Multimodal方向) ★
- 官网链接：https://zhaopin.kuaishou.cn/recruit/e/#/official/trainee/job-info/31019
- Base：北京 · VLM / 海外 GUI Agent
- 内容：参与 LLM/VLM 的 CT、SFT、RL 算法与海外 GUI Agent 研发，构建高并发低延迟的 Agent 推理服务架构。
- 技能要点：VLM、LLaVA、Qwen-VL、SFT、RLHF、DeepSpeed、Megatron、verl
- 学历：【硕士】（JD 原文：硕士及以上学历）
- 届别：JD 未限届别；硕士及以上可投；批次：日常实习
- 备注：以训练/Agent 算法为主，含 Agent 推理服务架构；硕士门槛。

## 优先级建议

1. **AIGC推理系统开发实习生** — AIGC推理系统开发实习生 · 北京 · 本科 / 在校生 / 不限
2. **Model Serving开发实习生** — Model Serving开发实习生 · 杭州 / 北京 · 本科 / 在校生 / 不限
3. **大模型推理框架研发实习生-【可灵AI专项】** — 大模型推理框架研发实习生-【可灵AI专项】 · 北京 · 未标注 / 在校生 / 不限
