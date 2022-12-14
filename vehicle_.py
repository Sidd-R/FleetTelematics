# -*- coding: utf-8 -*-
"""vehicle_.ipynb

Automatically generated by Colaboratory.

Original file is located at
    https://colab.research.google.com/drive/1hK5sn0jSbb0Gn71V8U55bvw782WGFWFD
"""

import numpy as np
import matplotlib.pyplot as plt
import pandas as pd
import seaborn as sns

df = pd.read_csv('vehicleH.csv')
X = df.iloc[:, 1:7].values
y = df.iloc[:, 0].values
df.head()

# corr = df.corr()
# ax1 = sns.heatmap(corr, cbar=0, linewidths=2,vmax=1, vmin=0, square=True, cmap='Blues')
# plt.show()

# df.info()

df['BATTERY_HEALTH'].value_counts()

# print(X[1])

from sklearn.compose import ColumnTransformer
from sklearn.preprocessing import OneHotEncoder
ct = ColumnTransformer(transformers=[('encoder', OneHotEncoder(), [2])], remainder='passthrough')
X = np.array(ct.fit_transform(X))
# print(X[1])

from sklearn.model_selection import train_test_split
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size = 0.2, random_state = 1)

from sklearn.linear_model import LinearRegression
regressor = LinearRegression()
regressor.fit(X_train, y_train)

temp = list(regressor.coef_)
temp.append(regressor.predict([[0,0,0,0,0,0,0]])[0])

print(*temp)
