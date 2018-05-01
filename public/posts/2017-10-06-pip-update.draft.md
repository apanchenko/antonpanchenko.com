2017-10-06-pip-update
ML update
orca show

![orca show](/posts/2017-10-06-pip-update.jpg)

I came back to my ML exercises after few inactive months. First of all I decided to update all packages:
```
activate tensorflow
pip3 list --outdated --format=columns > list.txt
pip3 install --upgrade -r list.txt
```
After spending an hour with various obstacles of the update process on Windows I deleted [Anaconda](https://conda.io/docs/_downloads/conda-cheatsheet.pdf) envs and all packages I knew about. Then reinstalled updated [tensorflow-gpu](https://www.tensorflow.org/install/install_windows). Easy.
I have a lot of ML theory in my head but too few practice, so have to start with MNIST again..