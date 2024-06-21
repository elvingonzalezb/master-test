class DataCleaner:
    def clean(self, data):      
        cleaned_data = []
        verified = set()
        for record in data:
            # TODO: pendiente mejorar           
            record = {k: (v if v is not None else "") for k, v in record.items()}            

            if record['id'] not in verified:
                verified.add(record['id'])
                cleaned_data.append(record)

        return cleaned_data
