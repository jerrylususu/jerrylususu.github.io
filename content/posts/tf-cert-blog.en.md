---
title: Tensorflow Developer Certification Journey
date: 2021-07-07T15:43:00+03:00
description: It took about 7 days
tags:
  - journey
---

<!-- # Tensorflow Developer Certification Journey -->

Also known as: How I Passed the Tensorflow Developer Certification in 7 Days, and Should You Do It Too?

> The author took the exam on 7/4/2021. This article was written on 7/7/2021. The content may change in the future.
>
> In the text, Tensorflow is referred to as TF, Machine Learning as ML, and Deep Learning as DL. Although DL is technically a subset of ML, given the advancements made in various fields, ML and DL are often used interchangeably.

## TL;DR

* It is possible to pass the TF Developer Certification in 7 days (or even less).
* In terms of practical skills, the certification is not highly regarded. Passing the certification only means that the person has the basic ability to perform tasks such as image classification, text classification, and time series prediction using TF.
* The significance of this certification may lie more in forcing oneself to read and learn, as well as demonstrating to potential employers the ability and intention to work on ML/DL-related tasks.

## Background Knowledge

### What is this certification?

* Tensorflow is an open-source DL framework created by Google. It is widely used and supports many services within Google.
* The Tensorflow Developer Certification is a certification program by Google that started in March 2020. It aims to demonstrate the ability of certified individuals to use Tensorflow to build DL models and complete specified tasks.

### Why might you want this certification?

* Learn ML/DL-related knowledge through the certification process.
* Demonstrate to future employers the willingness and ability to work on ML/DL-related tasks.

### How is the exam conducted?

* Registration fee is $100, and the exam must be taken within 180 days of payment.
* The exam has a time limit of 5 hours and consists of 5 tasks. Once all tasks are completed, the exam can be ended early.
* Each task requires the submission of a model, which can be submitted at any time. Feedback in the form of a 5-point scale is provided almost immediately after submission.
* The tasks have different weights, although the specific weights are not explicitly stated. In theory, a total score of over 90% is required to pass.
* Each task includes a description and a code framework, similar to a fill-in-the-blank exercise.
* Since the models are evaluated on a remote evaluation architecture, the model inputs and outputs are strictly defined. The main adjustments that can be made are the model architecture and training process.
* Pycharm is required for the exam, but it is only used as the exam UI. The actual model building and training can be done on other devices/platforms (such as Colab, Jupyter Notebook), and only the final model file (.h5) needs to be placed back in the exam directory.
* There are no restrictions on internet usage, and any resources can be used.
* After failing the exam, there is a waiting period before being able to retake it (14 days for the first attempt, one month for the second attempt, one year for the third attempt).

### My Background

* I started taking some data science/deep learning courses intermittently since my junior year, but I didn't have much practical experience beyond course assignments.
* The DL framework I mainly used before was PyTorch, so I didn't have much knowledge about TensorFlow.
* It is currently summer vacation, so I have some free time.
* I have always wanted to learn TF by reading "Hands-On Machine Learning with Scikit-Learn, Keras, and TensorFlow, 2nd Edition" (HOML), but I couldn't find the motivation to study.
* I was curious about how Google quantifies developers' abilities through certification exams.

### My Goals for Taking this Exam

* Familiarize myself with the architecture and usage of TF.
* Master the process of building DL models using TF, from data input to model deployment in a production environment.
* Be able to complete common DL tasks (image/text/time series/structured data).

The following sections will review the progress of these goals.

## Preparations

I first heard about this exam from Daniel Bourke's [video (YouTube)](https://www.youtube.com/watch?v=ya5NwvKafDk) and mainly referred to his [blog](https://www.mrdbourke.com/how-i-got-tensorflow-developer-certified/) for related materials. In addition, the TFUG Suzhou [video explanation (Bilibili)](https://www.bilibili.com/video/BV1wf4y117qF/?p=2) and [WeChat article](https://mp.weixin.qq.com/s?__biz=MzAwNTM2ODk3NA==&mid=2247483889&idx=1&sn=179ae82e14984af2b07f6d5363d60aaa) also provided some help.

### Resources

The following resources are listed in order of importance.

1. TF Certificate Candidate Handbook ([Chinese version link](https://www.tensorflow.org/site-assets/downloads/marketing/cert/TF_Certificate_Candidate_Handbook_zh-cn.pdf?hl=zh-cn), [English version link](https://www.tensorflow.org/extras/cert/TF_Certificate_Candidate_Handbook.pdf))
   This handbook provides guidance for the TF Developer Certification exam and instructions for setting up the exam environment (can be downloaded from the exam platform before the exam).

   **Must-have.** The "Candidate Handbook" is the most important official document and should be read in detail. It includes a skill checklist, which basically covers the main content of the exam. The "Exam Guide" and "Environment Setup" documents are only visible on the exam platform after payment, so it is recommended to read them before the exam and try to set up the environment to avoid any configuration issues during the exam.

2. Online course "DeepLearning.AI TensorFlow Developer Professional Certificate" ([Coursera](https://www.coursera.org/professional-certificates/tensorflow-in-practice), [Course Notebook Repo](https://github.com/lmoroney/dlaicourse))
   
   **Must-have.** This is actually a collection of four courses covering the basics of deep learning, CNN, NLP, and time series. It aligns almost completely with the skill checklist (in fact, the instructor of the course is the same person who signs the certificate). The course includes videos and an online coding environment, and the exercises are **similar** to the actual exam questions. If you can complete the course, you should have no major issues with the exam. The course itself is priced at $59, but it offers a one-week free trial (requires a credit card), so you can quickly finish it and cancel the payment method association.

3. Book "Hands-On Machine Learning with Scikit-Learn, Keras, and TensorFlow, 2nd Edition" ([O'Reilly](https://learning.oreilly.com/library/view/hands-on-machine-learning/9781491962282/), [Book Notebook Repo](https://github.com/ageron/handson-ml/))

   **Recommended.** This book is more like supplementary reading material and goes beyond the scope of the exam. However, it is helpful for building a knowledge base. Some topics that may not be clear in the online courses (such as the use of `tf.Dataset`) are explained in more detail in the book. The parts related to the exam are from Chapter 10 to Chapter 16. My university has a subscription to O'Reilly, so I chose to read it on my iPad, but you can also purchase the print version.

4. TF Official Documentation ([Tutorials](https://www.tensorflow.org/tutorials), [Guides](https://www.tensorflow.org/guide))

   **Optional.** The tutorials are like cookbooks with examples of solving various tasks. The guides focus more on the underlying principles and fundamental knowledge. You can browse the table of contents and refer to them when encountering unfamiliar concepts. If you have time, you can read them thoroughly.

### Learning Approach

When faced with multiple resources covering the same topic, there are generally two learning approaches:

* Depth-first: Study all resources related to the topic at once.
* Repetition: Study one specific resource at a time and repeat between different topics.

| Depth-first                                                         | Repetition                                                       |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| ![Depth-first](/img/tf-cert-blog-1.png) | ![Repetition](/img/tf-cert-blog-2.png) |

In Daniel Bourke's blog, he used the depth-first approach (tribird approach), focusing on one topic each day. He would start with the corresponding online course, then read the book, spend time practicing coding, and finish with MIT's videos. However, based on my own experience, I am more accustomed to the repetition approach, which allows the brain to process the knowledge in the background for a period of time before identifying areas that need further clarification. Readers can choose the appropriate approach based on their own preferences.

### Study Timeline

* Day 1: Read through the "Candidate Handbook" and print the skill checklist as a quick reference. Register for the exam and make the payment on the exam platform (must be completed in advance, as the identity verification process takes some time). Study the first two courses of the online course and complete the exercises. (Approximately 8 hours)
* Day 2: Study the last two courses of the online course and complete the exercises. (Approximately 10 hours)
* Day 3: Read Chapters 10 to 13 of the book and take notes. Review the code examples in the corresponding notebooks. (Approximately 8 hours)
* Day 4: Read Chapters 14 to 16 of the book and take notes. Review the code examples in the corresponding notebooks. Read the "Keras" section of the TF official guide. (Approximately 10 hours)
* Day 5: Read the "Keras Machine Learning Basics," "Loading and Preprocessing Data," "Images," "Text," and "Structured Data" sections of the TF official tutorials. Address any remaining questions from previous notes. Start implementing the exercises from Day 1 (reproduce and use different datasets). (Approximately 12 hours)
* Day 6: Start implementing the exercises from Day 2. Reproduce some interesting examples from the TF official tutorials. Try using Keras-tuner. Prepare the exam environment according to the environment setup document. (Approximately 12 hours)
* Day 7: Review notes. Reread the "Candidate Handbook" and "Exam Guide." Reproduce one of the previous exercises in Pycharm. (Approximately 8 hours)
* Day 8: Take the exam.

### Study Tips

* Create a collection of code snippets for quick reference (common network structures, preprocessing code, callbacks, etc.).
* Create a checklist, such as:
  * Possible error points when the model accuracy does not meet expectations (based on personal experience with completing exercises).
  * Approaches to handle overfitting (based on personal experience and reading related materials).
* Keep all the code written during the study period for future reference.

### Devices and Environment

I used a workstation in the lab, which had an older GPU (Quardo M2000, 4G VRAM). The system was Ubuntu 18.04, and the Pycharm version was 2021.1.3 Community. As a backup, I also applied for a GPU instance on the school's supercomputer, which had an RTX2080 GPU.

The models required for the exam are not too large, according to the "Exam Guide." If you can run the image classification and text classification examples [here](https://www.tensorflow.org/tutorials/images/classification) and [here](https://www.tensorflow.org/text/tutorials/text_classification_rnn) on your local machine, you should have no issues. Plus, with a five-hour time limit, there is generally no need to worry about insufficient local computing power causing training failures. If resources are limited, you can use Colab for training or purchase GPU-optimized instances from mainstream cloud providers.

The exam itself is conducted in a virtual environment using virtualenv. A Python 3.8 environment needs to be set up in advance, and the TF Certification Exam plugin should be installed in Pycharm.

It is worth noting that although Pycharm allows setting up a remote SSH Python interpreter, this configuration is not supported by the exam plugin. Therefore, it is best to install Pycharm and the exam plugin directly on a device with a GPU.

In terms of network environment, since the exam requires downloading datasets and uploading models from/to Google's servers, it is recommended to ensure a stable connection to the international internet or take the exam during off-peak hours. The datasets are downloaded using the `request` library in the code, but you can also manually download them using other tools and place them in the exam directory.

## During the Exam

* Prepare a Python 3.8 environment in advance and install the TF Certification Exam plugin in Pycharm.
* After running the plugin, log in to your Google account for authentication. The plugin will automatically create a virtual environment (venv) and install dependencies. Once completed, the "Start Exam" button will appear. Clicking on it will start the exam.
* The plugin will create a Pycharm project with 5 folders named Category1 to Category5. Each folder contains a `starter.py` file with a basic code framework, marked with `#TODO` comments indicating the parts that need to be filled in. When editing `starter.py`, the plugin will automatically display the description of the current question.
* After completing the training, a `mymodel.h5` file will be generated in the question folder. If you trained the model on a different device, you can manually place the model file (in h5 format) in the folder. Selecting "Submit and Test model" in the plugin will automatically submit the model for evaluation on the server. The progress bar in the lower right corner will show the upload progress, and the score (0/5 to 5/5) will be returned within 30 seconds after the upload is complete. If it takes too long to receive a score, it may be due to the model being too large/complex, and you can cancel the current evaluation.
* You can submit the model multiple times. The evaluation is based on a hidden portion of the data on the backend, and according to feedback from some participants, the data may have some randomness. Even for multiple submissions of the same model, the scores may vary.
* Once all questions have received a score of 5/5, click on the plugin and select "End Exam." Confirming the selection will end the exam.

I was fortunate in my exam experience because I had previously verified the environment based on the "Environment Setup" document, so I didn't encounter any environment-related issues. The five questions were not very difficult, and I completed four of them and received a score of 5/5 within 40 minutes of starting the exam. However, the NLP question was quite tricky. I tried various architectures but could only achieve a score of 4/5. In the end, I changed the optimizer, reduced the learning rate, and increased the number of epochs to train slowly, finally achieving a score of 5/5. When I finished the exam, there were still 3 hours and 10 minutes remaining.

The five questions I encountered were:

1. A simple regression task.
2. Classification on a dataset that you have definitely encountered multiple times.
3. Image classification.
4. Natural Language Processing (text classification).
5. Time series prediction.

## After the Exam

If you pass, you will receive a pass notification via email within a few minutes, and you can provide your information to register on Google's certification network. The digital certificate will be sent via email within a few working days.

## Review and Summary

Looking back on this week, I think it was an interesting experience. For me, spending money was an effective way to motivate myself to learn. At least during this week, I was able to thoroughly study some chapters of HOML. The exam itself was much easier than I imagined, which further emphasizes that passing this exam is just the beginning and only demonstrates the basic skills of completing simple tasks following tutorials. There is still a long way to go before truly mastering the subject.

The completion status of the goals I set for myself are as follows:

* Familiarize myself with the architecture and usage of TF.
  * Completed (went from having no experience to being able to quickly prototype).
* Master the process of building DL models using TF, from data input to model deployment in a production environment.
  * Partially completed (focused mainly on data input to model building, but did not cover deployment to a production environment).
* Be able to complete common DL tasks (image/text/time series/structured data).
  * Mostly completed (there are many subtasks within each major category, and this study only covered the most basic tasks, but it serves as a good introduction to foundational knowledge and getting started).

### So, Should You Take this Certification?

In my opinion, for students in computer/data science majors, ML/DL skills are considered a "default requirement." The TF Developer Certification is more like an additional skill level, similar to the "Computer Level 2" certification. It can be seen as an extra skill for students from non-related majors, but it may not have much significance for students within the major. However, currently, obtaining this certification may still have its value, especially in smaller companies where it might be easier to pass the HR screening.

Table: If you meet the following conditions, you...should consider taking this certification

| You might want to...                                                     | You might not want to...                                                   |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| - Force yourself to learn something<br />- Transition from a different major and need to demonstrate your skills and job-seeking intention<br />- Don't have much experience to write on your resume | - Already have mature and extensive ML/DL experience<br />- Don't have the spare money/time<br />- Think TensorFlow is too difficult and prefer PyTorch |