### EXTRACT DESIRED FIELDS FROM CSV FILES
import pandas as pd

# extract only dst and country
def extract_dst_country(csv_file):
    # Read the CSV
    df = pd.read_csv(csv_file)

    # Keep only dst and country
    df_dst_country = df[["dst", "country"]]

    # Save to new CSV in the data directory
    df_dst_country.to_csv("data/dst_country.csv", index=False)

