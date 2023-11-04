---
title: Simulating Wait Times at the Gym
date: 2023-09-29T15:34:23+08:00
---

In mid-July, I visited the hospital and started exercising regularly upon the doctor's advice. After considering my work schedule and my physical condition, I decided to go to the gym for a workout during lunchtime. Currently, my daily exercise routine consists of spending about 20 minutes on the elliptical machine at the gym (while watching an episode of a TV show), burning approximately 320 calories. However, even though there are plenty of elliptical machines in the gym, a situation occasionally arises where there are no available machines and I have to wait for someone to finish. Not knowing how long the wait will be can be slightly anxiety-inducing. So, I started thinking about whether there is a way to quantify the wait time, such as simulating and calculating the probability distribution function. And that's how this article came about.

Code (mostly written using GPT3.5, with some manual adjustments): [link to code](https://gist.github.com/jerrylususu/2d8f7099a1c4af37160179b12ce13895)

Assumption: There are 10 elliptical machines, and the exercise time of each user on a machine, denoted as `t_n`, follows a normal distribution with a mean of `μ` and a standard deviation of `σ`. When I arrive at the gym, all 10 machines are already occupied, and the remaining exercise time for each user is uniformly distributed between 0 and `t_n`. The wait time is defined as the minimum of the remaining exercise times for all users.

Considering that the parameters `μ` and `σ` cannot be accurately estimated, we consider 9 different scenarios by varying `μ` as 5/10/15 and `σ` as 20/25/30. For each scenario, we run 10,000 simulations and calculate the p50/p75/p90/p95 of the wait time. The results are summarized in the following table:

| μ    | σ    | mean  | p50   | p75   | p90   | p95   |
| ---- | ---- | ----- | ----- | ----- | ----- | ----- |
| 20   | 5    | 1.698 | 1.252 | 2.406 | 3.817 | 4.811 |
| 20   | 10   | 1.258 | 0.858 | 1.772 | 2.944 | 3.813 |
| 20   | 15   | 1.151 | 0.737 | 1.604 | 2.761 | 3.641 |
| 25   | 5    | 2.198 | 1.632 | 3.123 | 4.978 | 6.229 |
| 25   | 10   | 1.769 | 1.258 | 2.494 | 4.077 | 5.213 |
| 25   | 15   | 1.477 | 0.967 | 2.069 | 3.508 | 4.634 |
| 30   | 5    | 2.671 | 1.977 | 3.813 | 6.059 | 7.515 |
| 30   | 10   | 2.284 | 1.669 | 3.219 | 5.186 | 6.632 |
| 30   | 15   | 1.965 | 1.364 | 2.720 | 4.624 | 6.019 |

![Visualization of Simulation Results](/img/gym_wait_sim_result.png)

Conclusion: Taking all scenarios into account, there is a 50% probability of waiting for about 2 minutes to secure a spot, and in the worst-case scenario, there is a 90% probability of waiting for up to 6 minutes to secure a spot.
